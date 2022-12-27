import './ThemeTogglerExampleQuantity.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Theme } from '../../../../Theme/Theme';
import {
  exampleThemesThree,
  exampleThemesTwo,
  Theme as ThemeType,
} from '../../../__mocks__/data.mock';
import { ThemeToggler } from '../../../ThemeToggler';

const cnThemeTogglerExample = cn('ThemeTogglerExample');

const GetThemeTogglerExampleQuantity = (items: ThemeType[]): JSX.Element => {
  const [value, setValue] = useState<ThemeType>(exampleThemesTwo[0]);

  return (
    <Example col={1}>
      <Theme
        preset={value.theme}
        className={cnThemeTogglerExample('', [cnDocsDecorator('Section')])}
      >
        <ThemeToggler
          items={items}
          value={value}
          onChange={({ value }) => setValue(value)}
          direction="downStartLeft"
        />
      </Theme>
    </Example>
  );
};

export const ThemeTogglerExampleQuantityTwo = () =>
  GetThemeTogglerExampleQuantity(exampleThemesTwo);

export const ThemeTogglerExampleQuantityThree = () =>
  GetThemeTogglerExampleQuantity(exampleThemesThree);
