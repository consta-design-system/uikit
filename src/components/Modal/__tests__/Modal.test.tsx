import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { Modal } from '../Modal';

type TModalProps = React.ComponentProps<typeof Modal>;

const testId = 'modal';
const testChildrenId = 'modalChildren';
const overlayAriaLabel = 'Overlay';

const getComponent = (props: TModalProps) => {
  return (
    <Modal data-testid={testId} isOpen {...props}>
      <h1 data-testid={testChildrenId}>test</h1>
    </Modal>
  );
};

describe('Компонент Modal', () => {
  const onClose = jest.fn();

  it('должен рендериться без ошибок', () => {
    render(getComponent({ onClose }));
  });

  describe('проверка props', () => {
    describe('проверка children', () => {
      it('отображается прокинутый компонент', () => {
        render(getComponent({ onClose }));
        const modalChildren = screen.getByTestId(testChildrenId);
        expect(modalChildren).toBeInTheDocument();
      });
    });

    describe('проверка className', () => {
      it('присваивается дополнительный класс', () => {
        const className = 'className';
        render(getComponent({ onClose, className }));
        const modal = screen.getByTestId(testId);
        expect(modal).toHaveClass(className);
      });
    });

    describe('проверка обработчиков событий нажатий клавиш', () => {
      it('onEsc: отрабатывает после нажатия на esc', () => {
        const onEsc = jest.fn(() => true);
        const { container } = render(getComponent({ isOpen: true, onEsc }));
        fireEvent.keyUp(container, { key: 'Escape', code: 'Escape' });
        expect(onEsc).toHaveBeenCalled();
        expect(onEsc).toHaveReturned();
      });
    });
  });

  describe('проверка оверлэя', () => {
    const onClickOutside = jest.fn();

    it('должен рендериться по дефолту', () => {
      render(getComponent({ onClose }));
      const overlay = screen.getByLabelText(overlayAriaLabel);
      expect(overlay).toBeInTheDocument();
    });

    it('должен вызваться onClickOutside по клику на оверлэй', () => {
      render(getComponent({ hasOverlay: true, onClickOutside }));
      const overlay = screen.getByLabelText(overlayAriaLabel);
      fireEvent.mouseDown(overlay);
      expect(onClickOutside).toHaveBeenCalledTimes(1);
    });
  });

  // Исправить
  // describe('проверка onOpen и onClose', () => {
  //   const onOpen = jest.fn();
  //   const onClose = jest.fn();
  //   const { rerender } = render(getComponent({ onClose, onOpen }));

  //   it('onOpen должен вызваться после рендера', () => {
  //     expect(onOpen).toHaveBeenCalledTimes(1);
  //     expect(onClose).toHaveBeenCalledTimes(0);
  //   });

  //   it('onClose должен вызваться после закрытия', () => {
  //     rerender(getComponent({ onClose, onOpen, isOpen: false }));
  //     expect(onOpen).toHaveBeenCalledTimes(1);
  //     expect(onClose).toHaveBeenCalledTimes(1);
  //   });
  // });
});
