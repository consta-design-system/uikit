import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnListItem } from '../../ListCanary';
import { exampleThemesThree, exampleThemesTwo } from '../__mocks__/data.mock';
import { ThemeToggler } from '../ThemeToggler';
import { ThemeTogglerProps } from '../types';

type Item = typeof exampleThemesTwo[number];

const defaultSetValue = jest.fn();
const testId = 'ThemeToggler';

const renderComponent = (props: Partial<ThemeTogglerProps<Item>>) => {
  return render(
    <>
      <div data-testid="outside" />
      <ThemeToggler
        {...props}
        getItemKey={(item) => item.label}
        data-testid={testId}
        className={props.className}
        items={props.items || exampleThemesThree}
        value={
          props.value || (props.items && props.items[0]) || exampleThemesTwo[0]
        }
        onChange={props.onChange || defaultSetValue}
      />
    </>,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function toggleClick() {
  fireEvent.click(getRender());
}

function getItems() {
  return document.querySelectorAll(`.${cnListItem()}`);
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
      expect(() =>
        renderComponent({ items: exampleThemesThree }),
      ).not.toThrow();
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

    // Исправить
    it('срабатывает onChange при выборе темы', () => {
      const handleChange = jest.fn();
      renderComponent({
        items: exampleThemesThree,
        onChange: ({ value }) => handleChange(value),
      });

      toggleClick();
      fireEvent.click(getItem());

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining(exampleThemesThree[0]),
      );
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
