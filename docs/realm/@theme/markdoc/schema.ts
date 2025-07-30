import { FormatImageTag } from './components/FormatImage/FormatImage-markdoc';
import { ColorModeExampleTag } from './components/ColorModeExample/ColorModeExample-markdoc';
import { IconTag } from './components/Icon/Icon-markdoc';

export const tags = {
  'format-image': FormatImageTag,
  'color-mode-image-example': ColorModeExampleTag,
  icon: IconTag,
}

export const functions = {
  isAfterDate: {
    transform(parameters) {
      const inputDateString = parameters[0]; 
      const inputDate = new Date(inputDateString);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);  
      return inputDate < currentDate;
    }
  }
}
