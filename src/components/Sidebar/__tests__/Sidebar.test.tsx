import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Sidebar } from '../Sidebar';

type SidebarProps = React.ComponentProps<typeof Sidebar>;

const testId = 'sidebar';
const testContentId = 'sidebarContent';
const testActionsId = 'sidebarActions';
const overlayAriaLabel = 'Overlay';

const getComponent = (props: SidebarProps) => {
  return (
    <Sidebar data-testid={testId} isOpen {...props}>
      <Sidebar.Content data-testid={testContentId}>test content</Sidebar.Content>
      <Sidebar.Actions data-testid={testActionsId}>test actions</Sidebar.Actions>
    </Sidebar>
  );
};

describe('Компонент Sidebar', () => {
  const onClose = jest.fn();

  it('должен рендериться без ошибок', () => {
    render(getComponent({ onClose }));
  });

  describe('проверка props', () => {
    describe('проверка isOpen', () => {
      it('отображается при isOpen={true}', () => {
        render(getComponent({ isOpen: true }));
        const sidebar = screen.getByTestId(testId);
        expect(sidebar).toBeInTheDocument();
      });
    });

    describe('проверка className', () => {
      it('присваивается дополнительный класс', () => {
        const className = 'className';
        render(getComponent({ className }));
        const sidebar = screen.getByTestId(testId);
        expect(sidebar).toHaveClass(className);
      });
    });

    describe('проверка оверлэя', () => {
      const onClickOutside = jest.fn();

      it('должен рендериться по дефолту', () => {
        render(getComponent({ onClose }));
        const overlay = screen.getByLabelText(overlayAriaLabel);
        expect(overlay).toBeInTheDocument();
      });

      it('вызывается onClickOutside при клике по оверлэю', () => {
        render(getComponent({ hasOverlay: true, onClickOutside }));
        const overlay = screen.getByLabelText(overlayAriaLabel);
        fireEvent.mouseDown(overlay);
        expect(onClickOutside).toHaveBeenCalledTimes(1);
      });
    });

    describe('проверка коллбэков onOpen, onClose', () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();

      it('onOpen вызывается после открытия сайдбара', () => {
        render(getComponent({ onOpen, onClose }));
        expect(onOpen).toBeCalled();
        expect(onClose).not.toBeCalled();
      });

      it('onClose вызывается после закрытия сайдбара', () => {
        render(getComponent({ onOpen, onClose, isOpen: false }));
        expect(onOpen).toBeCalled();
        expect(onClose).toBeCalled();
      });
    });
  });
});
