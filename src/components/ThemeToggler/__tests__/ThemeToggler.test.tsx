import React from 'react';
import { render, screen } from '@testing-library/react';

import { exampleThemesThree, exampleThemesTwo } from '../__mocks__/data.mock';
import { Props, ThemeToggler } from '../ThemeToggler';

type Item = typeof exampleThemesTwo[number];

type ThemeTogglerProps = Props<Item>;

const defaultSetValue = jest.fn();

const testId = 'ThemeToggler';

const renderComponent = (props: Partial<ThemeTogglerProps>) => {
  return render(
    <div data-testid="outside">
      <ThemeToggler
        {...props}
        data-testid={testId}
        className={props.className}
        items={props.items || exampleThemesThree}
        getItemLabel={(theme) => theme.label}
        getItemIcon={(theme) => theme.icon}
        value={props.value || (props.items && props.items[0]) || exampleThemesTwo[0]}
        onChange={defaultSetValue}
      />
    </div>,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

describe('Компонент ThemeToggler', () => {
  it('должен рендериться без ошибок c двумя темами', () => {
    expect(() => renderComponent({ items: exampleThemesTwo })).not.toThrow();
  });
  it('должен рендериться без ошибок c тремя темами', () => {
    expect(() => renderComponent({ items: exampleThemesThree })).not.toThrow();
  });
  it('должен рендериться c ошибкой c одной темой', () => {
    expect(() => renderComponent({ items: [exampleThemesThree[0]] })).toThrow();
  });
  describe('проверка className', () => {
    it(`Дополнительный className присваевается`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });
});
