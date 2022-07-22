import React from 'react';

import { Layout } from '@consta/header/Layout';
import { IconHamburger } from '@consta/uikit/IconHamburger';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { ThemeToggler, ThemeTogglerPropSetValue } from '@consta/uikit/ThemeToggler';
import { cnMixSpace } from '@consta/uikit/MixSpace';

import { cn } from '##/utils/bem';
import { ThemePreset } from '@consta/uikit/Theme';

import { themeAtom, themes, getThemeKey, getThemeIcon } from '##/modules/theme';

import { useAction, useAtom } from '@reatom/react';

import { openLeftSide } from '##/exportAtoms/layout';

import { useBreakpoints } from '@consta/uikit/useBreakpoints';

const cnHeader = cn('Header');

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
