import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { cnIcon } from '../../../icons/Icon/Icon';
import { IconAdd } from '../../../icons/IconAdd/IconAdd';
import { snackBarItemStatus } from '../helper';
import { cnSnackBar, SnackBar } from '../SnackBar';
import { cnSnackBarItem } from '../SnackBarItem/SnackBarItem';

type SnackBarProps = React.ComponentProps<typeof SnackBar>;

const testId = cnSnackBar();

const items: SnackBarProps['items'] = [
  {
    key: 1,
  },
];

const renderComponent = (props: SnackBarProps = { items }) => {
  return render(<SnackBar data-testid={testId} {...props} />);
};

describe('Компонент SnackBar', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка items', () => {
    describe('массив рендерится верно', () => {
      it(`количество совпадает с передоваемым`, () => {
        const items: SnackBarProps['items'] = [
          {
            key: 1,
          },
          {
            key: 2,
          },
          {
            key: 3,
          },
        ];

        renderComponent({ items });

        const snackBar = screen.getByTestId(testId);
        const itemsRender = snackBar.querySelectorAll(`.${cnSnackBarItem()}`);
        expect(itemsRender.length).toEqual(items.length);
      });
    });
    describe('проверка message', () => {
      it(`отображает текст сообщения `, () => {
        const messageText = 'Сообщение';
        const items: SnackBarProps['items'] = [
          {
            key: 1,
            message: messageText,
          },
        ];

        renderComponent({ items });

        const snackBar = screen.getByTestId(testId);
        const message = snackBar.querySelector(`.${cnSnackBarItem('Message')}`) as HTMLDivElement;

        expect(message.textContent).toEqual(messageText);
      });
    });
    describe('проверка status', () => {
      snackBarItemStatus.forEach((status) => {
        it(`присваивает класс для status=${status} `, () => {
          const items: SnackBarProps['items'] = [
            {
              key: 1,
              status,
            },
          ];

          renderComponent({ items });

          const snackBar = screen.getByTestId(testId);
          const item = snackBar.querySelector(`.${cnSnackBarItem()}`) as HTMLDivElement;
          expect(item).toHaveClass(cnSnackBarItem({ status }));
        });
      });
    });
    describe('проверка icon', () => {
      it('отображает иконку', () => {
        const items: SnackBarProps['items'] = [
          {
            key: 1,
            icon: IconAdd,
          },
        ];

        renderComponent({ items });

        const snackBar = screen.getByTestId(testId);
        const icon = snackBar.querySelector(`.${cnSnackBarItem('Icon')}`) as HTMLSpanElement;

        expect(icon).toHaveClass(cnIcon());
      });
    });
    describe('проверка actions', () => {
      const actionLabel = 'Действие';
      const handleClick = jest.fn();
      const items: SnackBarProps['items'] = [
        {
          key: 1,
          actions: [
            {
              label: actionLabel,
              onClick: handleClick,
            },
          ],
        },
      ];
      it('отображает кнопку действия', () => {
        renderComponent({ items });

        const snackBar = screen.getByTestId(testId);
        const actionButton = snackBar.querySelector('.SnackBarActionButton') as HTMLButtonElement;

        expect(actionButton.textContent).toEqual(actionLabel);
      });
      it('кнопка действия срабатывает', () => {
        renderComponent({ items });

        const snackBar = screen.getByTestId(testId);
        const actionButton = snackBar.querySelector('.SnackBarActionButton') as HTMLButtonElement;

        fireEvent.click(actionButton);

        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
    describe('проверка onClose', () => {
      const handleClick = jest.fn();
      const items: SnackBarProps['items'] = [
        {
          key: 1,
          onClose: handleClick,
        },
      ];
      it('отображает иконку на кнопке', () => {
        renderComponent({ items });

        const snackBar = screen.getByTestId(testId);
        const closeButton = snackBar.querySelector(
          `.${cnSnackBarItem('CloseButton')}`,
        ) as HTMLSpanElement;

        expect(closeButton.children[0]).toHaveClass(cnIcon());
      });
      it('кнопка закрытия срабатывает', () => {
        renderComponent({ items });

        const snackBar = screen.getByTestId(testId);
        const closeButton = snackBar.querySelector(
          `.${cnSnackBarItem('CloseButton')}`,
        ) as HTMLSpanElement;

        fireEvent.click(closeButton);

        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
    describe('проверка autoClose', () => {
      it('срабатывает onClose при autoClose = 1', () => {
        const handleClick = jest.fn();
        const items: SnackBarProps['items'] = [
          {
            key: 1,
            autoClose: 1,
            onClose: handleClick,
          },
        ];

        jest.useFakeTimers();
        act(() => {
          renderComponent({ items });
        });

        expect(handleClick).not.toBeCalled();
        act(() => {
          jest.advanceTimersByTime(1000);
        });

        expect(handleClick).toBeCalled();
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
      it('срабатывает onClose при autoClose = true', () => {
        const handleClick = jest.fn();
        const items: SnackBarProps['items'] = [
          {
            key: 1,
            autoClose: true,
            onClose: handleClick,
          },
        ];

        jest.useFakeTimers();
        act(() => {
          renderComponent({ items });
        });

        expect(handleClick).not.toBeCalled();
        act(() => {
          jest.advanceTimersByTime(3000);
        });

        expect(handleClick).toBeCalled();
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
      it('срабатывает onAutoClose', () => {
        const handleClose = jest.fn();
        const handleAutoClose = jest.fn();
        const items: SnackBarProps['items'] = [
          {
            key: 1,
            autoClose: true,
            onClose: handleClose,
            onAutoClose: handleAutoClose,
          },
        ];

        jest.useFakeTimers();
        act(() => {
          renderComponent({ items });
        });

        expect(handleClose).not.toBeCalled();
        act(() => {
          jest.advanceTimersByTime(3000);
        });

        expect(handleClose).not.toBeCalled();
        expect(handleAutoClose).toBeCalled();
        expect(handleAutoClose).toHaveBeenCalledTimes(1);
      });
    });
  });
});
