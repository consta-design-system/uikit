import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnSidebar, Sidebar, SidebarProps, sidebarPropSize } from '..';

const testId = 'Sidebar';

const renderComponent = (props: SidebarProps) => {
  return render(<Sidebar data-testid={testId} {...props} />);
};

const getRender = () => {
  return screen.getByTestId(testId);
};

const getSidebarContent = () => {
  return getRender().querySelector(`.${cnSidebar('Content')}`);
};

const getSidebarActions = () => {
  return getRender().querySelector(`.${cnSidebar('Actions')}`);
};

const getOverlay = () => {
  return document.querySelector(`.${cnSidebar('Overlay')}`)!;
};

describe('Компонент Sidebar', () => {
  it('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('SidebarContent отображается корректно', () => {
    const textContent = 'content';
    renderComponent({
      isOpen: true,
      children: <Sidebar.Content>{textContent}</Sidebar.Content>,
    });
    const content = getSidebarContent();
    expect(content).toHaveTextContent(textContent);
  });

  it('SidebarActions отображается корректно', () => {
    const textContent = 'content';
    renderComponent({
      isOpen: true,
      children: <Sidebar.Actions>{textContent}</Sidebar.Actions>,
    });
    const actions = getSidebarActions();
    expect(actions).toHaveTextContent(textContent);
  });

  describe('проверка overlay', () => {
    it('overlay отображается при hasOverlay=true', () => {
      renderComponent({
        isOpen: true,
        hasOverlay: true,
        children: <div>text</div>,
      });

      const overlay = getOverlay();

      expect(overlay).toBeInTheDocument();
    });

    it('overlay не отображается при hasOverlay=false', () => {
      renderComponent({
        isOpen: true,
        hasOverlay: false,
        children: <div>text</div>,
      });

      const overlay = getOverlay();

      expect(overlay).not.toBeInTheDocument();
    });
  });

  describe("проверка callback'ов", () => {
    it('onOpen вызывается при открытии', () => {
      const handleOpen = jest.fn();
      const { rerender } = renderComponent({
        isOpen: false,
        onOpen: handleOpen,
      });

      rerender(
        <Sidebar isOpen onOpen={handleOpen}>
          text
        </Sidebar>,
      );

      expect(handleOpen).toHaveBeenCalledTimes(1);
    });

    it('onClose вызывается при закрытии', () => {
      const handleClose = jest.fn();
      const { rerender } = renderComponent({
        isOpen: true,
        onClose: handleClose,
      });

      rerender(
        <Sidebar isOpen={false} onClose={handleClose}>
          text
        </Sidebar>,
      );

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('onEsc вызывается при нажатии Escape', () => {
      const handleEsc = jest.fn();
      renderComponent({ isOpen: true, onEsc: handleEsc });

      fireEvent.keyUp(document, { key: 'Escape' });

      expect(handleEsc).toHaveBeenCalledTimes(1);
    });

    it('onClickOutside вызывается при клике вне сайдбара', () => {
      const handleClickOutside = jest.fn();
      renderComponent({ isOpen: true, onClickOutside: handleClickOutside });

      fireEvent.mouseDown(getOverlay());

      expect(handleClickOutside).toHaveBeenCalledTimes(1);
    });
  });

  describe('проверка props', () => {
    it('рендерится в указанный container', () => {
      const portal = document.createElement('div');
      portal.setAttribute('id', 'portal');
      document.body.appendChild(portal);

      renderComponent({ isOpen: true, container: portal });

      expect(portal).toContainElement(getRender());
      document.body.removeChild(portal);
    });

    it('присваивает ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ isOpen: true, ref, children: '' });
      expect(ref.current).toBe(getRender());
    });

    test.each(sidebarPropSize)('применяется класс для размера %p', (size) => {
      renderComponent({ isOpen: true, size });
      const sidebarWindow = getRender();
      expect(sidebarWindow).toHaveClass(cnSidebar('Window', { size }));
    });
  });
});
