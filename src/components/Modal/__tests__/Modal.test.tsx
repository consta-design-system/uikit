import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Modal } from '../Modal';

type TModalProps = React.ComponentProps<typeof Modal>;

const testId = 'modal';
const testChildrenId = 'modalChildren';
const overlayAriaLabel = 'Оверлэй';

const renderComponent = (props: TModalProps) => {
  const { onClose, ...rest } = props;
  return render(
    <Modal data-testid={testId} isOpen onClose={onClose} {...rest}>
      <h1 data-testid={testChildrenId}>test</h1>
    </Modal>,
  );
};

describe('Компонент Modal', () => {
  const onClose = jest.fn();

  it('должен рендериться без ошибок', () => {
    renderComponent({ onClose });
  });

  describe('проверка props', () => {
    describe('проверка children', () => {
      it('отображается прокинутый компонент', () => {
        renderComponent({ onClose });
        const modalChildren = screen.getByTestId(testChildrenId);
        expect(modalChildren).toBeInTheDocument();
      });
    });

    describe('проверка className', () => {
      it('присваивается дополнительный класс', () => {
        const className = 'className';
        renderComponent({ onClose, className });
        const modal = screen.getByTestId(testId);
        expect(modal).toHaveClass(className);
      });
    });
  });

  describe('проверка оверлэя', () => {
    it('должен рендериться по дефолту', () => {
      renderComponent({ onClose });
      const overlay = screen.getByLabelText(overlayAriaLabel);
      expect(overlay).toBeInTheDocument();
    });

    it('не должен вызывать событие onClose по клику, передавая closeByClickOnOverlay={false}', () => {
      renderComponent({ onClose, closeByClickOnOverlay: false });
      const overlay = screen.getByLabelText(overlayAriaLabel);
      const modal = screen.getByTestId(testId);
      fireEvent.click(overlay);
      expect(modal).toBeInTheDocument();
    });
  });
});
