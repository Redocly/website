import { OpenapiLanguageServer, languageServerConfig } from '@redocly/openapi-language-server';
import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { 
  BaseLanguageService,
  createDocumentProvider,
  monacoPositionToLS,
  lsRangeToMonaco,
  mapCompletionKind,
  mapSeverityToMonaco,
  LSPosition
} from '@redocly/marketing-pages/pages/editor/service/index.js';
import { validationConfig } from './validationConfig';

// Initialize language server configuration
languageServerConfig.registerConfigFinder(async uri => {
  if (typeof globalThis.process === 'undefined') {
    globalThis.process = { cwd: () => '/' } as any;
  } else if (typeof globalThis.process.cwd === 'undefined') {
    (globalThis.process as any).cwd = () => '/';
  }
  return 'config';
});

/**
 * OpenAPI Language Server Service
 * Extends base service with OpenAPI-specific features
 */
export class LanguageServerService extends BaseLanguageService {
  private languageServer: OpenapiLanguageServer;

  constructor() {
    super();
    this.languageServer = new OpenapiLanguageServer();
  }

  /**
   * Initialize the language server with Monaco editor instance
   */
  override initialize(editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) {
    super.initialize(editor, monaco);
    
    this.registerDocumentsProvider();
    this.languageServer.onDidConfigChange('config');

    this.registerCompletionProvider();
    this.registerDefinitionProvider();
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
        // Match config URI
        if (uri === 'config' || uri === 'file:///config' || uri.endsWith('/config')) {
          return {
            getText: () => {
              return JSON.stringify(validationConfig, null, 2);
            },
          };
        }

        return createDocumentProvider(this.editor);
      },
    });
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
        const pos = monacoPositionToLS(position);
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
              kind: mapCompletionKind(lsCompletion.kind, this.monaco!),
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
  }

  /**
   * Register definition provider
   */
  private registerDefinitionProvider() {
    if (!this.monaco) return;

    this.monaco.languages.registerDefinitionProvider('yaml', {
      provideDefinition: async (model, position) => {
        const textDocument = { uri: model.uri.toString() };
        const pos = monacoPositionToLS(position);
        const definition = await this.languageServer.onDefinition({ textDocument, position: pos });

        if (!definition) return [];

        return (Array.isArray(definition) ? definition : [definition]).map(def => ({
          uri: this.monaco!.Uri.parse(def.targetUri),
          originSelectionRange: lsRangeToMonaco(def.originSelectionRange, this.monaco!),
          range: lsRangeToMonaco(def.targetSelectionRange, this.monaco!),
        }));
      },
    });
  }

  /**
   * Get OpenAPI validation diagnostics
   */
  protected override async getValidationDiagnostics(
    model: Monaco.editor.ITextModel
  ): Promise<Monaco.editor.IMarkerData[]> {
    const valueSnapshot = model.getValue();
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

    try {
      const validationResults = await this.languageServer.validateOpenAPI(textDocument as any);
      
      return validationResults.flatMap((result: any) =>
        result.diagnostics.map((diagnostic: any) => ({
          severity: mapSeverityToMonaco(diagnostic.severity, this.monaco!),
          startLineNumber: diagnostic.range.start.line + 1,
          startColumn: diagnostic.range.start.character + 1,
          endLineNumber: diagnostic.range.end.line + 1,
          endColumn: diagnostic.range.end.character + 1,
          message: diagnostic.message,
          source: 'openapi',
        }))
      );
    } catch (error) {
      console.error('Error during OpenAPI validation:', error);
      return [];
    }
  }
}

