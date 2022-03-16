import './ThemeTogglerExampleSize.css';

import React, { useState } from 'react';

import { exampleThemesThree, Theme as ThemeType } from '../../../__mocks__/data.mock';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Theme } from '../../../../Theme/Theme';
import { ThemeToggler } from '../../../ThemeToggler';

const cnThemeTogglerExample = cn('ThemeTogglerExample');

export const GetThemeTogglerExample = (items: ThemeType[]): JSX.Element => {
  const [value, setValue] = useState<ThemeType>(exampleThemesThree[0]);

  return (
    <Theme preset={value.theme} className={cnThemeTogglerExample('', [cnDocsDecorator('Section')])}>
      <ThemeToggler
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        direction="downStartLeft"
        size="xs"
      />
      <ThemeToggler
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        direction="downStartLeft"
        size="s"
      />
      <ThemeToggler
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        direction="downStartLeft"
        size="m"
      />
      <ThemeToggler
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        direction="downStartLeft"
        size="l"
      />
    </Theme>
  );
};

export const ThemeTogglerExampleSize = () => GetThemeTogglerExample(exampleThemesThree);
