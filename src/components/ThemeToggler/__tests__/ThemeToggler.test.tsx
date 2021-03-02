import React from 'react';
import { render, screen } from '@testing-library/react';

import { exampleThemesThree, exampleThemesTwo, Theme } from '../__mocks__/mock.data';
import { cnThemeToggler, ThemeToggler } from '../ThemeToggler';

const testId = cnThemeToggler();

const defaultSetValue = jest.fn();

const renderComponent = (props: {
  themes?: Theme[];
  value?: Theme;
  className?: string;
  contextMenuClassName?: string;
  setValue?: (arg: Theme) => void;
}) => {
  return render(
    <div data-testid="outside">
      <ThemeToggler
        {...props}
        data-testid={testId}
        className={props.className}
        contextMenuClassName={props.contextMenuClassName}
        themes={props.themes || exampleThemesThree}
        getThemeLabel={(theme) => theme.label}
        getThemeValue={(theme) => theme.theme}
        getThemeIcon={(theme) => theme.icon}
        value={props.value || (props.themes && props.themes[0]) || exampleThemesTwo[0]}
        setValue={defaultSetValue}
      />
    </div>,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

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
