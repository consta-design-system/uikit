import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { exampleThemesThree, exampleThemesTwo } from '../__mocks__/data.mock';
import { cnContextMenuItem } from '../../ContextMenu/ContextMenuItem/ContextMenuItem';
import { Props, ThemeToggler } from '../ThemeToggler';

type Item = typeof exampleThemesTwo[number];

type ThemeTogglerProps = Props<Item>;

const defaultSetValue = jest.fn();
const testId = 'ThemeToggler';

const renderComponent = (props: Partial<ThemeTogglerProps>) => {
  return render(
    <>
      <div data-testid="outside" />
      <ThemeToggler
        {...props}
        data-testid={testId}
        className={props.className}
        items={props.items || exampleThemesThree}
        getItemLabel={(theme) => theme.label}
        getItemIcon={(theme) => theme.icon}
        value={props.value || (props.items && props.items[0]) || exampleThemesTwo[0]}
        onChange={props.onChange || defaultSetValue}
      />
    </>,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getOutside() {
  return screen.getByTestId('outside');
}

function outsideClick() {
  fireEvent.mouseDown(getOutside());
}

function toggleClick() {
  fireEvent.click(getRender());
}

function getItems() {
  return document.querySelectorAll(`.${cnContextMenuItem()}`);
}

function getItem(index = 0) {
  return getItems()[index];
}

describe('Компонент ThemeToggler', () => {
  describe('с двумя темами', () => {
    it('должен рендериться без ошибок', () => {
      expect(() => renderComponent({ items: exampleThemesTwo })).not.toThrow();
    });

    it('срабатывает onChange при клике', () => {
      const handleChange = jest.fn();
      renderComponent({ items: exampleThemesTwo, onChange: handleChange });

      toggleClick();

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('с тремя темами', () => {
    it('должен рендериться без ошибок', () => {
      expect(() => renderComponent({ items: exampleThemesThree })).not.toThrow();
    });

    it('количество items совпадает с передаваемым', () => {
      renderComponent({ items: exampleThemesThree });

      toggleClick();

      expect(getItems().length).toEqual(exampleThemesThree.length);
    });

    it('label совпадает', () => {
      renderComponent({});

      toggleClick();

      expect(getItem().textContent).toEqual(exampleThemesThree[0].label);
    });

    it('срабатывает onChange при выборе темы', () => {
      const handleChange = jest.fn();
      renderComponent({ items: exampleThemesThree, onChange: ({ value }) => handleChange(value) });

      toggleClick();
      fireEvent.click(getItem());

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining(exampleThemesThree[0]));
    });

    it('список закрывается по клику за пределами', () => {
      renderComponent({});

      toggleClick();

      const item = getItem();

      expect(item).toBeInTheDocument();

      outsideClick();

      expect(item).not.toBeInTheDocument();
    });
  });

  describe('проверка className', () => {
    it(`дополнительный className присваевается`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });
});
