import './ThemeToggler.variants.css';

import { useSelect } from '@consta/stand';
import React, { useState } from 'react';

import { buttonPropView } from '##/components/Button';
import { directions } from '##/components/Popover';
import { Theme } from '##/components/Theme';
import { cn } from '##/utils/bem';

import {
  exampleThemesThree,
  exampleThemesTwo,
  Theme as ThemeType,
} from '../__mocks__/data.mock';
import { ThemeToggler } from '../ThemeToggler';
import { themeTogglerPropSize, themeTogglerPropSizeDefault } from '../types';

const cnThemeTogglerVariants = cn('ThemeTogglerVariants');

const Variants = () => {
  const size = useSelect(
    'size',
    themeTogglerPropSize,
    themeTogglerPropSizeDefault,
  );
  const themes = useSelect('number of themes', ['two', 'three'], 'two');
  const view = useSelect('view', buttonPropView, 'clear');
  const direction = useSelect('direction', directions, 'downStartLeft');

  const themeArray = themes === 'two' ? exampleThemesTwo : exampleThemesThree;
  const [value, setValue] = useState<ThemeType>(themeArray[0]);

  return (
    <Theme preset={value.theme} className={cnThemeTogglerVariants()}>
      <ThemeToggler
        size={size}
        items={themeArray}
        value={value}
        onChange={({ value }) => setValue(value)}
        direction={direction}
        view={view}
      />
    </Theme>
  );
};

export default Variants;
