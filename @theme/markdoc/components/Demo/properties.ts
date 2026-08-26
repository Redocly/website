export type AttributeValue = string | number | boolean | undefined;

export type AttributeDescriptor = {
  type?: string;
  required?: boolean;
  default?: AttributeValue;
  enum?: AttributeValue[];
  matches?: unknown;
  description?: string;
  /** Name of the group whose toggle shows or hides this attribute. */
  group?: string;
  /** Keeps the attribute off the form while its value still reaches the tag. */
  hidden?: boolean;
};

export type AttributeDescriptors = Record<string, AttributeDescriptor>;

/** A toggle that shows or hides the attributes assigned to it. */
export type PropertyGroup = {
  name: string;
  label?: string;
  enabled?: boolean;
};

/** Describes the body of the demonstrated tag rather than one of its attributes. */
export type ContentDescriptor = {
  description?: string;
  required?: boolean;
  /** Name of the group whose panel holds the field. */
  group?: string;
  /** "start", "end", or the name of the attribute the field follows. */
  location?: string;
};

/** A horizontal line between form fields. */
export type SeparatorDescriptor = {
  /** Name of the group whose panel holds the line. */
  group?: string;
  /** "start", "end", or the name of the attribute the line follows. */
  location?: string;
};

export type ParsedProperties = {
  groups: PropertyGroup[];
  descriptors: AttributeDescriptors;
  content?: ContentDescriptor;
  separators: SeparatorDescriptor[];
};

export type AttributeControlKind =
  | 'color'
  | 'radio'
  | 'select'
  | 'switch'
  | 'number'
  | 'textarea'
  | 'text';

/**
 * Reads the `properties` attribute of the demo tag.
 * Markdoc passes an object literal or a `$frontmatter` reference as an object,
 * so a string arrives only when the author writes plain JSON.
 *
 * Accepts a flat map of descriptors, or `{groups, content, attributes}` when the
 * form needs toggles or an editable body. An `attributes` object marks the second shape.
 */
export function parseProperties(properties: unknown): ParsedProperties {
  const source = typeof properties === 'string' ? safeParseJson(properties) : properties;

  if (!isPlainObject(source)) {
    return { groups: [], descriptors: {}, separators: [] };
  }

  if (isPlainObject(source.attributes)) {
    return {
      groups: parseGroups(source.groups),
      content: parseContent(source.content),
      separators: parseSeparators(source.separators),
      descriptors: toDescriptors(source.attributes),
    };
  }

  return { groups: [], descriptors: toDescriptors(source), separators: [] };
}

function parseSeparators(separators: unknown): SeparatorDescriptor[] {
  if (!Array.isArray(separators)) {
    return [];
  }

  return separators.filter(isPlainObject).map((separator) => ({
    group: typeof separator.group === 'string' ? separator.group : undefined,
    location: typeof separator.location === 'string' ? separator.location : undefined,
  }));
}

function parseContent(content: unknown): ContentDescriptor | undefined {
  if (!isPlainObject(content)) {
    return undefined;
  }

  return {
    description: typeof content.description === 'string' ? content.description : undefined,
    required: content.required === true,
    group: typeof content.group === 'string' ? content.group : undefined,
    location: typeof content.location === 'string' ? content.location : undefined,
  };
}

/**
 * Index a field or a line takes among the given attribute names.
 * "start" and an unknown name both put it first, "end" puts it last, and any
 * other name puts it straight after that attribute.
 */
export function getInsertIndex(names: string[], location?: string): number {
  if (location === 'end') {
    return names.length;
  }

  if (!location || location === 'start') {
    return 0;
  }

  const index = names.indexOf(location);

  return index === -1 ? 0 : index + 1;
}

/** "children" names the tag body, so it never travels with the attributes. */
function toDescriptors(source: Record<string, unknown>): AttributeDescriptors {
  return Object.fromEntries(
    Object.entries(source).filter(([, descriptor]) => isPlainObject(descriptor)),
  ) as AttributeDescriptors;
}

function parseGroups(groups: unknown): PropertyGroup[] {
  if (!Array.isArray(groups)) {
    return [];
  }

  return groups
    .filter((group): group is Record<string, unknown> => isPlainObject(group))
    .filter((group) => typeof group.name === 'string' && group.name.length > 0)
    .map((group) => ({
      name: group.name as string,
      label: typeof group.label === 'string' ? group.label : undefined,
      // A group shows its attributes unless the author opts out.
      enabled: group.enabled !== false,
    }));
}

/** Groups start out on unless the author sets `enabled: false`. */
export function getInitialGroupState(groups: PropertyGroup[]): Record<string, boolean> {
  return Object.fromEntries(groups.map((group) => [group.name, group.enabled !== false]));
}

/**
 * Attributes of a disabled group leave the tag entirely, so both the preview and
 * the snippet behave as if the author never set them.
 */
export function getActiveValues(
  values: Record<string, AttributeValue>,
  descriptors: AttributeDescriptors,
  groupState: Record<string, boolean>,
): Record<string, AttributeValue> {
  return Object.fromEntries(
    Object.entries(values).filter(([name]) => {
      const group = descriptors[name]?.group;

      // An attribute pointing at an undeclared group stays visible.
      return !group || !(group in groupState) || groupState[group];
    }),
  );
}

/** Returns the allowed values of an attribute, or `undefined` when it accepts any value. */
export function getEnumOptions(descriptor: AttributeDescriptor): AttributeValue[] | undefined {
  const options = descriptor.enum ?? descriptor.matches;
  return Array.isArray(options) && options.length > 0 ? (options as AttributeValue[]) : undefined;
}

/** Above this count the options go into a dropdown instead of a radio group. */
export const MAX_RADIO_GROUP_OPTIONS = 4;


export function getControlKind(descriptor: AttributeDescriptor): AttributeControlKind {
  const type = String(descriptor.type).toLowerCase();

  // A color always uses swatches, however many names it offers.
  if (type === 'color') {
    return 'color';
  }

  const options = getEnumOptions(descriptor);

  if (options) {
    return options.length <= MAX_RADIO_GROUP_OPTIONS ? 'radio' : 'select';
  }

  switch (type) {
    case 'boolean':
      return 'switch';
    case 'number':
      return 'number';
    case 'text':
      return 'textarea';
    default:
      return 'text';
  }
}

export function getInitialValues(descriptors: AttributeDescriptors): Record<string, AttributeValue> {
  return Object.fromEntries(
    Object.entries(descriptors).map(([name, descriptor]) => [name, getInitialValue(descriptor)]),
  );
}

function getInitialValue(descriptor: AttributeDescriptor): AttributeValue {
  if (descriptor.default !== undefined) {
    return descriptor.default;
  }

  return getControlKind(descriptor) === 'switch' ? false : undefined;
}

/**
 * Drops unset attributes so the demonstrated tag falls back to its own defaults
 * instead of receiving an empty value.
 */
export function toTagProps(values: Record<string, AttributeValue>): Record<string, AttributeValue> {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined && value !== ''),
  );
}

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

