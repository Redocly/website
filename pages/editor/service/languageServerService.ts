import { OpenapiLanguageServer, languageServerConfig } from '@redocly/openapi-language-server';
import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { load } from 'js-yaml';

// Initialize language server configuration
languageServerConfig.registerConfigFinder(async uri => {
  console.log('🔧 [LS Config] Config requested for URI:', uri);
  if (typeof globalThis.process === 'undefined') {
    globalThis.process = { cwd: () => '/' } as any;
  } else if (typeof globalThis.process.cwd === 'undefined') {
    (globalThis.process as any).cwd = () => '/';
  }
  console.log('🔧 [LS Config] Returning config identifier: "config"');
  return 'config';
});

// Define a type for Language Server positions for clarity
export interface LSPosition {
  line: number;
  character: number;
}

export interface DocumentProvider {
  _lineOffsets: number[];
  getText: (options?: { start?: number; end?: number }) => string;
  offsetAt: (position: LSPosition) => number;
  positionAt: (offset: number) => LSPosition;
  lineCount: number;
}

export interface ValidationCallback {
  (errors: Monaco.editor.IMarkerData[], value: string): void;
}

/**
 * Service class to handle OpenAPI Language Server integration
 */
export class LanguageServerService {
  private languageServer: OpenapiLanguageServer;
  private monaco: typeof Monaco | null = null;
  private editor: Monaco.editor.IStandaloneCodeEditor | null = null;

  constructor() {
    this.languageServer = new OpenapiLanguageServer();
  }

  /**
   * Initialize the language server with Monaco editor instance
   */
  initialize(editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) {
    console.log('🎯 [LS Init] Initializing language server');
    this.editor = editor;
    this.monaco = monaco;
    globalThis.__dirname = '.';
    
    this.registerDocumentsProvider();
    this.languageServer.onDidConfigChange('config');

    this.registerCompletionProvider();
    this.registerDefinitionProvider();
    
    console.log('✅ [LS Init] Language server initialized');
  }

  /**
   * Register documents provider for the language server
   */
  private registerDocumentsProvider() {
    languageServerConfig.registerDocumentsProvider({
      all() {
        return [];
      },
      get: uri => {
        console.log('📄 [LS Config] Document requested for URI:', uri);
        
        // Match config URI - the configFinder returns 'config' which becomes the URI
        if (uri === 'config' || uri === 'file:///config' || uri.endsWith('/config')) {
          console.log('✅ [LS Config] Matched config URI, providing config document');
          return {
            getText: () => {
              console.log('📋 [LS Config] Returning validation config');
              const config = {
                extends: ['minimal'],
                rules: {
                  // Core structural validation
                  'spec': 'error',
                  'no-unresolved-refs': 'error',
                  'operation-2xx-response': 'error',
                  'path-parameters-defined': 'error',
                  'operation-operationId-unique': 'error',
                  'no-enum-type-mismatch': 'error',
                  'path-declaration-must-exist': 'error',
                  'operation-parameters-unique': 'error',
                  'no-path-trailing-slash': 'error',
                  'path-not-include-query': 'error',
                  
                  // Best practices
                  'operation-tag-defined': 'warn',
                  'tag-description': 'warn',
                  'operation-operationId': 'warn',
                  'operation-summary': 'warn',
                  'info-contact': 'warn',
                  'operation-description': 'warn',
                },
              };
              return JSON.stringify(config, null, 2);
            },
          };
        }

        console.log('📝 [LS Config] Not a config URI, returning document provider for editor content');
        return this.createDocumentProvider();
      },
    });
  }

  /**
   * Create document provider for current editor content
   */
  private createDocumentProvider(): DocumentProvider & { _lineOffsets: number[] } {
    const model = this.editor?.getModel();
    return {
      _lineOffsets: [] as number[],
      get lineCount() {
        return model?.getLineCount() || 0;
      },
      getText: ({ start = 0, end = undefined } = {}) => {
        const editorValue = this.editor?.getModel()?.getValue() || '';
        return editorValue.slice(start, end);
      },
      offsetAt(position: LSPosition) {
        const editorValue = this.getText();

        this._lineOffsets = [0];
        for (let i = 0; i < editorValue.length; i++) {
          if (editorValue[i] === '\n') {
            this._lineOffsets.push(i + 1);
          }
        }

        if (!model) return 0;

        return model.getOffsetAt({
          lineNumber: position.line + 1,
          column: position.character + 1,
        });
      },
      positionAt: (offset: number): any => {
        if (!model) return { line: 1, character: 1 };
        const pos = model.getPositionAt(offset);
        return { line: pos.lineNumber, character: pos.column };
      },
    };
  }

  /**
   * Register completion item provider
   */
  private registerCompletionProvider() {
    if (!this.monaco) return;

    this.monaco.languages.registerCompletionItemProvider('yaml', {
      triggerCharacters: [' ', '\n', '\\', '/', '"', "'"],
      provideCompletionItems: async (model, position) => {
        const textDocument = { uri: model.uri.toString() };
        const pos = { line: position.lineNumber - 1, character: position.column - 1 };
        const completionsLS = await this.languageServer.onCompletion({ textDocument, position: pos });

        if (!completionsLS) return { suggestions: [] };

        return {
          suggestions: completionsLS.map(lsCompletion => {
            let monacoInsertTextFormat = 1;
            if (lsCompletion.insertTextFormat === 2) {
              monacoInsertTextFormat = 2;
            }

            let monacoInsertTextRules: Monaco.languages.CompletionItemInsertTextRule | undefined = undefined;
            if (monacoInsertTextFormat === 2) {
              monacoInsertTextRules = this.monaco!.languages.CompletionItemInsertTextRule.InsertAsSnippet;
            }

            return {
              label: lsCompletion.label,
              kind:
                this.monaco!.languages.CompletionItemKind[
                  lsCompletion.kind as keyof typeof this.monaco.languages.CompletionItemKind
                ] || this.monaco!.languages.CompletionItemKind.Text,
              insertText: lsCompletion.insertText || lsCompletion.label,
              insertTextFormat: monacoInsertTextFormat,
              sortText: lsCompletion.sortText,
              insertTextRules: monacoInsertTextRules,
              range: new this.monaco!.Range(position.lineNumber, position.column, position.lineNumber, position.column),
            };
          }),
        };
      },
    });

    // this.monaco.languages.registerDefinitionProvider('yaml', {
    //   provideDefinition: async (model, position) => {
    //     const textDocument = { uri: model.uri.toString(), getText: () => model.getValue() };
    //     const pos = { line: position.lineNumber - 1, character: position.column - 1 };
    //     return this.languageServer.onDefinition({ textDocument, position: pos });
    //   },
    // });
  }

  /**
   * Register definition provider
   */
  private registerDefinitionProvider() {
    if (!this.monaco) return;

    this.monaco.languages.registerDefinitionProvider('yaml', {
      provideDefinition: async (model, position) => {
        const textDocument = { uri: model.uri.toString() };
        const pos = { line: position.lineNumber - 1, character: position.column - 1 };
        const definition = await this.languageServer.onDefinition({ textDocument, position: pos });

        if (!definition) return [];

        return (Array.isArray(definition) ? definition : [definition]).map(def => ({
          uri: this.monaco!.Uri.parse(def.targetUri),
          originSelectionRange: new this.monaco!.Range(
            def.originSelectionRange.start.line + 1,
            def.originSelectionRange.start.character + 1,
            def.originSelectionRange.end.line + 1,
            def.originSelectionRange.end.character + 1
          ),
          range: new this.monaco!.Range(
            def.targetSelectionRange.start.line + 1,
            def.targetSelectionRange.start.character + 1,
            def.targetSelectionRange.end.line + 1,
            def.targetSelectionRange.end.character + 1
          ),
        }));
      },
    });
  }

  /**
   * Validate OpenAPI content and provide diagnostics
   */
  async validateContent(onValidationUpdate?: ValidationCallback, hideWarnings?: boolean): Promise<void> {
    console.log('🔍 [LS Validation] Starting validation...', { hideWarnings });
    
    if (!this.editor || !this.monaco) {
      console.warn('⚠️ [LS Validation] No editor or monaco instance available');
      return;
    }

    const model = this.editor.getModel();
    if (!model) {
      console.warn('⚠️ [LS Validation] No model available');
      return;
    }

    const valueSnapshot = model.getValue();
    console.log('📄 [LS Validation] Content length:', valueSnapshot.length, 'characters');
    const textDocument = {
      uri: model.uri.toString(),
      languageId: 'yaml',
      version: model.getVersionId(),
      getText: () => valueSnapshot,
      positionAt: (offset: number): LSPosition => {
        const pos = model.getPositionAt(offset);
        return { line: pos.lineNumber - 1, character: pos.column - 1 };
      },
      offsetAt: (lsPosition: LSPosition): number => {
        return model.getOffsetAt({
          lineNumber: lsPosition.line + 1,
          column: lsPosition.character + 1,
        });
      },
      lineCount: model.getLineCount(),
    };

    const severityMap = {
      1: this.monaco!.MarkerSeverity.Error,
      2: this.monaco!.MarkerSeverity.Warning,
      3: this.monaco!.MarkerSeverity.Info,
      4: this.monaco!.MarkerSeverity.Hint,
    };

    try {
      console.log('🔎 [LS Validation] Calling language server validateOpenAPI...');
      const validationResults = await this.languageServer.validateOpenAPI(textDocument as any);
      console.log('✅ [LS Validation] Language server returned results:', validationResults?.length || 0, 'result(s)');
      console.log('🔍 [LS Validation] Validation results:', validationResults);
      
      const monacoDiagnostics: Monaco.editor.IMarkerData[] = validationResults
        .flatMap((result: any) =>
          result.diagnostics.map((diagnostic: any) => ({
            severity: severityMap[diagnostic.severity] || this.monaco!.MarkerSeverity.Error,
            startLineNumber: diagnostic.range.start.line + 1,
            startColumn: diagnostic.range.start.character + 1,
            endLineNumber: diagnostic.range.end.line + 1,
            endColumn: diagnostic.range.end.character + 1,
            message: diagnostic.message,
            source: '',
          }))
        )
        .filter(d => {
          if (!hideWarnings) return true;
          return d.severity !== this.monaco!.MarkerSeverity.Warning;
        })
        .sort((a, b) => b.severity - a.severity);
      
      console.log('📊 [LS Validation] OpenAPI diagnostics count:', monacoDiagnostics.length);

      // Add YAML syntax errors
      console.log('📝 [LS Validation] Parsing YAML for syntax validation...');
      try {
        const parsed = load(valueSnapshot);
        console.log('✅ [LS Validation] YAML parsed successfully');
        
        if (
          valueSnapshot.trim() !== '' &&
          (typeof parsed !== 'object' ||
            parsed === null ||
            ((parsed.openapi === undefined || !parsed.openapi.match(/^3\.[0,1]\.\d+$/)) &&
              (parsed.swagger === undefined || !parsed.swagger.match(/^2\.[0,1]\.\d+$/))))
        ) {
          console.warn('⚠️ [LS Validation] Not a valid OpenAPI/Swagger specification');
          monacoDiagnostics.push({
            severity: 8,
            message:
              'Not an OpenAPI or Swagger specification. Only OpenAPI 3.0.x and Swagger 2.0.x are supported. Rule: struct',
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: 1,
            endColumn: 1000,
          });
        } else {
          console.log('✅ [LS Validation] Valid OpenAPI/Swagger specification detected');
        }
      } catch (e: any) {
        console.error('❌ [LS Validation] YAML parsing error:', e.message || e.reason);
        monacoDiagnostics.push({
          severity: 8,
          message: e.reason + ' Rule: struct',
          startLineNumber: e.mark?.line || 1,
          startColumn: 0,
          endLineNumber: e.mark?.line || 1,
          endColumn: 1000,
        });
      }

      console.log('🏁 [LS Validation] Setting markers. Total diagnostics:', monacoDiagnostics.length);
      if (monacoDiagnostics.length > 0) {
        console.log('🐛 [LS Validation] Diagnostics summary:', 
          monacoDiagnostics.map(d => ({
            severity: d.severity === 8 ? 'Error' : d.severity === 4 ? 'Warning' : 'Other',
            line: d.startLineNumber,
            message: d.message.substring(0, 50) + (d.message.length > 50 ? '...' : '')
          }))
        );
      }
      
      this.monaco.editor.setModelMarkers(model, 'openapi-ls', monacoDiagnostics);

      if (onValidationUpdate) {
        console.log('📢 [LS Validation] Calling validation update callback');
        onValidationUpdate(monacoDiagnostics, valueSnapshot);
      } else {
        console.log('ℹ️ [LS Validation] No validation callback provided');
      }
      
      console.log('✨ [LS Validation] Validation completed successfully');
    } catch (error) {
      console.error('💥 [LS Validation] Error during validation:', error);
    }
  }

  /**
   * Setup automatic validation on content changes
   */
  setupAutoValidation(onValidationUpdate?: ValidationCallback, hideWarnings?: boolean): () => void {
    console.log('🚀 [LS Validation] Setting up auto-validation', { hideWarnings, hasCallback: !!onValidationUpdate });
    
    if (!this.editor) {
      console.warn('⚠️ [LS Validation] Cannot setup auto-validation: no editor');
      return () => {};
    }

    const validateContent = () => this.validateContent(onValidationUpdate, hideWarnings);

    // Initial validation
    console.log('🔄 [LS Validation] Running initial validation');
    validateContent();

    // Setup content change listener
    const disposable = this.editor.onDidChangeModelContent(() => {
      console.log('📝 [LS Validation] Content changed, triggering validation');
      validateContent();
    });

    console.log('✅ [LS Validation] Auto-validation setup complete');
    return () => {
      console.log('🛑 [LS Validation] Disposing auto-validation');
      disposable.dispose();
    };
  }
}
