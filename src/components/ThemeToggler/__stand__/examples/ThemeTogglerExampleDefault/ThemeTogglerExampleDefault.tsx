import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Theme } from '../../../../Theme/Theme';
import {
  exampleThemesThree,
  Theme as ThemeType,
} from '../../../__mocks__/data.mock';
import { ThemeToggler } from '../../../ThemeToggler';

export const ThemeTogglerExampleDefault = () => {
  const [value, setValue] = useState<ThemeType>(exampleThemesThree[0]);

  return (
    <Theme preset={value.theme} className={cnDocsDecorator('Section')}>
      <ThemeToggler
        items={exampleThemesThree}
        value={value}
        onChange={({ value }) => setValue(value)}
        direction="downStartLeft"
      />
    </Theme>
  );
};
