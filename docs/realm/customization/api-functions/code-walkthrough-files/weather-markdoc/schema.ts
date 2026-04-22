// @chunk {"steps": ["tag-schema"]}
import type { Schema } from '@markdoc/markdoc';

export const tags: Record<string, Schema> = {
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
