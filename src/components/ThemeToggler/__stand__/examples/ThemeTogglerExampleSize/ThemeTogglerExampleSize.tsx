import './ThemeTogglerExampleSize.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Theme } from '../../../../Theme/Theme';
import {
  exampleThemesThree,
  Theme as ThemeType,
} from '../../../__mocks__/data.mock';
import { ThemeToggler } from '../../../ThemeToggler';

const cnThemeTogglerExample = cn('ThemeTogglerExample');

export const GetThemeTogglerExample = (items: ThemeType[]): JSX.Element => {
  const [value, setValue] = useState<ThemeType>(exampleThemesThree[0]);

  return (
    <Example
      col={{ 1: 0, 2: 300, 4: 600 }}
      separately
      items={(['xs', 's', 'm', 'l'] as const).map((size) => ({
        label: `size="${size}"`,
        node: (
          <Theme
            preset={value.theme}
            className={cnThemeTogglerExample('', [cnDocsDecorator('Section')])}
          >
            <ThemeToggler
              items={items}
              value={value}
              onChange={({ value }) => setValue(value)}
              direction="downStartLeft"
              key={size}
              size={size}
            />
          </Theme>
        ),
      }))}
    />
  );
};

export const ThemeTogglerExampleSize = () =>
  GetThemeTogglerExample(exampleThemesThree);
