import { Layout } from '@consta/header/Layout';
import { Button } from '@consta/uikit/Button';
import { IconHamburger } from '@consta/uikit/IconHamburger';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { ThemePreset } from '@consta/uikit/Theme';
import {
  ThemeToggler,
  ThemeTogglerPropSetValue,
} from '@consta/uikit/ThemeToggler';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useAction, useAtom } from '@reatom/react';
import React from 'react';

import { openLeftSide } from '##/exportAtoms/layout';
import { getThemeIcon, getThemeKey, themeAtom, themes } from '##/modules/theme';

export const Header = () => {
  const setTheme: ThemeTogglerPropSetValue<ThemePreset> = useAction((props) =>
    themeAtom.set(props.value),
  );

  const toggleMenu = useAction(openLeftSide.toggle);

  const breakpoints = useBreakpoints({
    l: 1364,
  });

  const [theme] = useAtom(themeAtom);

  return (
    <Layout
      rowCenter={{
        left: [
          breakpoints.l ? undefined : (
            <Button
              key="Button"
              view="clear"
              iconLeft={IconHamburger}
              className={cnMixSpace({ mR: 's' })}
              onClick={toggleMenu}
            />
          ),
          <Text key="Logo" size="l" weight="bold">
            Consta
          </Text>,
        ],
        center: '',
        right: (
          <ThemeToggler
            getItemKey={getThemeKey}
            getItemLabel={getThemeKey}
            getItemIcon={getThemeIcon}
            items={themes}
            onChange={setTheme}
            value={theme}
          />
        ),
      }}
    />
  );
};
