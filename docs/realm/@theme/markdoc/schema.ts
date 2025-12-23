import { IconTag } from './components/ThemeIcon/Icon-markdoc';
import { ConfigIntroductionTag } from './components/config/Introduction/Introduction-markdoc';
import { ConfigPropertyTag } from './components/config/Property/Property-markdoc';
import { ConfigSectionTag } from './components/config/Section/Section-markdoc';
import { ConfigOptionRequirementsTag } from './components/config/OptionRequirements/OptionRequirements-markdoc';

export const tags = {
  themeIcon: IconTag,
  configIntroduction: ConfigIntroductionTag,
  configSection: ConfigSectionTag,
  configProperty: ConfigPropertyTag,
  configOptionRequirements: ConfigOptionRequirementsTag,
};

export const functions = {
  isAfterDate: {
    transform(parameters) {
      const inputDateString = parameters[0];
      const inputDate = new Date(inputDateString);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      return inputDate < currentDate;
    },
  },
};
