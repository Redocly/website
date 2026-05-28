// @chunk {"steps": ["tag-schema"]}
import type { MarkdocTagSchema } from '@redocly/theme/markdoc/tags/types';

export const tags: Record<string, MarkdocTagSchema> = {
  weather: {
    render: 'CurrentWeather',
    selfClosing: true,
    attributes: {
      location: {
        type: String,
        description: 'City to display weather for',
      },
      units: {
        type: String,
        default: 'celsius',
        matches: ['celsius', 'fahrenheit'],
        description: 'Temperature units',
      },
    },
  },
};
// @chunk-end
