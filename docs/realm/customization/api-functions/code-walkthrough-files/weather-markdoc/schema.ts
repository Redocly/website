// @chunk {"steps": ["tag-schema"]}
import type { Schema } from '@markdoc/markdoc';

export const tags: Record<string, Schema> = {
  weather: {
    render: 'CurrentWeather',
    selfClosing: true,
    attributes: {
      q: { type: String },
      units: { type: String, default: 'c' },
    },
  },
};
// @chunk-end
