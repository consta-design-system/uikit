import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  generateThemeClassNames,
  presetGpnDark,
  presetGpnDefault,
  useTheme,
} from '../../Theme/Theme';
import { PortalWithTheme } from '../PortalWithTheme';

type PortalWithThemeProps = React.ComponentProps<typeof PortalWithTheme>;

const testId = 'PortalWithTheme';

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = (
  props: Omit<PortalWithThemeProps, 'preset'> & {
    preset?: PortalWithThemeProps['preset'];
  },
) => {
  return render(
    <PortalWithTheme
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
