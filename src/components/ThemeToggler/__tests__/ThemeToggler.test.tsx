import React from 'react';
import { render, screen } from '@testing-library/react';

import { exampleThemesThree, exampleThemesTwo, Theme } from '../__mocks__/mock.data';
import { ThemePreset } from '../../Theme/Theme';
import { cnThemeToggler, ThemeToggler } from '../ThemeToggler';

const testId = cnThemeToggler();

const defaultSetValue = jest.fn();

const renderComponent = (props: {
  themes?: Theme[];
  value?: ThemePreset;
  className?: string;
  setValue?: (arg: ThemePreset) => void;
}) => {
  return render(
    <div data-testid="outside">
      <ThemeToggler
        {...props}
        data-testid={testId}
        className={props.className}
        themes={props.themes || exampleThemesTwo}
        getThemeLabel={(theme) => theme.label}
        getThemeValue={(theme) => theme.theme}
        getThemeIcon={(theme) => theme.icon}
        value={props.value || (props.themes && props.themes[0].theme) || exampleThemesTwo[0].theme}
        setValue={props.setValue || defaultSetValue}
      />
    </div>,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

// const ValueTest = (props: { themes: Theme[] }) => {
//   const [value, setValue] = useState(props.themes[0].theme);
//   return (
//     <ThemeToggler
//       data-testid={testId}
//       themes={props.themes}
//       getThemeLabel={(theme) => theme.label}
//       getThemeValue={(theme) => theme.theme}
//       getThemeIcon={(theme) => theme.icon}
//       value={value}
//       setValue={setValue}
//     />,
//   );
// };

describe('Компонент ThemeToggler', () => {
  it('должен рендериться без ошибок c двумя темами', () => {
    expect(() => renderComponent({ themes: exampleThemesTwo })).not.toThrow();
  });
  it('должен рендериться без ошибок c тремя темами', () => {
    expect(() => renderComponent({ themes: exampleThemesThree })).not.toThrow();
  });
  describe('проверка className', () => {
    it(`Дополнительный className присваевается`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });
});
