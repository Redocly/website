export type ParsedYaml = Record<string, any>;

export function parseSimpleYaml(yaml: string): ParsedYaml {
  const lines = yaml.split(/\r?\n/);
  const root: ParsedYaml = {};
  const stack: Array<{ indent: number; value: any; type: 'object' | 'array' }> = [
    { indent: -1, value: root, type: 'object' },
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line) continue;
    const indent = line.match(/^ */)?.[0].length ?? 0;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    if (trimmed.startsWith('- ')) {
      if (parent.type !== 'array') {
        continue;
      }
      const arr = parent.value as any[];
      const itemContent = trimmed.slice(2).trim();
      if (!itemContent) {
        const obj: ParsedYaml = {};
        arr.push(obj);
        stack.push({ indent, value: obj, type: 'object' });
        continue;
      }
      if (itemContent.includes(':')) {
        const [keyPart, rest = ''] = itemContent.split(/:(.*)/);
        const obj: ParsedYaml = {};
        if (rest.trim()) {
          obj[keyPart.trim()] = parseScalar(rest.trim());
        }
        arr.push(obj);
        stack.push({ indent, value: obj, type: 'object' });
      } else {
        arr.push(parseScalar(itemContent));
      }
      continue;
    }

    const [keyPart, valuePart = ''] = trimmed.split(/:(.*)/);
    const key = keyPart.trim();
    const value = valuePart.trim();

    if (!value) {
      const nextLine = lines[i + 1]?.trim() ?? '';
      const isArray = nextLine.startsWith('- ');
      const container = isArray ? [] : {};
      parent.value[key] = container;
      stack.push({ indent, value: container, type: isArray ? 'array' : 'object' });
      continue;
    }

    parent.value[key] = parseScalar(value);
  }

  return root;
}

export function extractFrontmatter(content: string) {
  const lines = content.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') {
    return {};
  }
  const endIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (endIndex === -1) {
    return {};
  }
  const frontmatterLines = lines.slice(1, endIndex).join('\n');
  return parseSimpleYaml(frontmatterLines);
}

export function parseScalar(value: string) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!Number.isNaN(Number(value))) return Number(value);
  return value;
}

