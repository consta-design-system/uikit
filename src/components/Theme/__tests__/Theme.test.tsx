import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  cnTheme,
  generateThemeClassNames,
  presetGpnDark,
  presetGpnDefault,
  Theme,
  useTheme,
} from '../Theme';

type ThemeProps = React.ComponentProps<typeof Theme>;

const testId = cnTheme();

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = (
  props: Omit<ThemeProps, 'preset'> & { preset?: ThemeProps['preset'] },
) => {
  return render(
    <Theme
      {...props}
      preset={props.preset || presetGpnDefault}
      data-testid={testId}
    />,
  );
};

describe('Компонент Theme', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });

  describe('проверка useTheme', () => {
    it('возвращает ожидаемый theme', () => {
      const Children = () => {
        const { theme } = useTheme();
        return <>{JSON.stringify(theme)}</>;
      };
      renderComponent({ children: <Children />, preset: presetGpnDark });
      expect(getRender()).toHaveTextContent(JSON.stringify(presetGpnDark));
    });
    it('возвращает ожидаемый themeClassNames', () => {
      const Children = () => {
        const { themeClassNames } = useTheme();
        return <>{JSON.stringify(themeClassNames)}</>;
      };
      renderComponent({ children: <Children />, preset: presetGpnDark });
      expect(getRender()).toHaveTextContent(
        JSON.stringify(generateThemeClassNames(presetGpnDark)),
      );
    });
  });
});
