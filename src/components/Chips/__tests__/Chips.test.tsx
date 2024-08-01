import { IconClose } from '@consta/icons/IconClose';
import { IconDinosaur } from '@consta/icons/IconDinosaur';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Chips } from '../Chips';
import { ChipsDefaultItem, ChipsProps } from '../types';

const defaultItems: ChipsDefaultItem[] = [
  {
    label: 'one',
  },
  {
    label: 'two',
    iconLeft: IconDinosaur,
  },
  {
    label: 'three',
    iconRight: IconClose,
  },
];
const testId = 'chips-test-id';

type WithPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

function renderComponent(props?: WithPartial<ChipsProps, 'items'>) {
  return render(<Chips data-testid={testId} items={defaultItems} {...props} />);
}

describe('Chips', () => {
  test('Рендерится без ошибок', () => {
    renderComponent();

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  describe('Props', () => {
    describe('Обработчики onItemClick и onItemRightIconClick', () => {
      test('onClick вызывается', () => {
        const onClick = jest.fn();
        renderComponent({ onItemClick: onClick });

        const item = screen.getByText(defaultItems[0].label);
        fireEvent.click(item);

        expect(onClick).toHaveBeenCalled();
        expect(onClick.mock.calls[0][0]).toBe(defaultItems[0]);
      });

      test('onItemRightIconClick вызывается', () => {
        const onClick = jest.fn();
        const { container } = renderComponent({
          onItemRightIconClick: onClick,
        });

        const rightIconClose = container.querySelector('.IconClose');
        expect(rightIconClose).toBeInTheDocument();
        fireEvent.click(rightIconClose!);

        expect(onClick).toHaveBeenCalled();
        expect(onClick.mock.calls[0][0]).toBe(defaultItems[2]);
      });

      test('Обработчики не вызываются на глобальный disabled', () => {
        const onItemClick = jest.fn();
        const onItemRightIconClick = jest.fn();
        const { container } = renderComponent({
          onItemRightIconClick,
          onItemClick,
          disabled: true,
        });

        const item = screen.getByText(defaultItems[0].label);
        fireEvent.click(item);

        const rightIconClose = container.querySelector('.IconClose');
        expect(rightIconClose).toBeInTheDocument();
        fireEvent.click(rightIconClose!);

        expect(onItemClick).not.toHaveBeenCalled();
        expect(onItemRightIconClick).not.toHaveBeenCalled();
      });

      test('Обработчики не вызываются на disabled конкретного элемента', () => {
        const onItemClick = jest.fn();
        const onItemRightIconClick = jest.fn();
        const itemsWithDisabled = defaultItems.map((item) => {
          return { ...item, disabled: !!item.iconRight || !!item.iconLeft };
        });
        const { container } = renderComponent({
          items: itemsWithDisabled,
          onItemRightIconClick,
          onItemClick,
        });

        const disabledItem = screen.getByText(itemsWithDisabled[1].label);
        fireEvent.click(disabledItem);

        const rightIconClose = container.querySelector('.IconClose');
        expect(rightIconClose).toBeInTheDocument();
        fireEvent.click(rightIconClose!);

        expect(onItemClick).not.toHaveBeenCalled();
        expect(onItemRightIconClick).not.toHaveBeenCalled();

        const enabledItem = screen.getByText(itemsWithDisabled[0].label);
        fireEvent.click(enabledItem);

        expect(onItemClick).toHaveBeenCalled();
      });
    });
  });
});
