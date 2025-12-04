import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { animateTimeout } from '##/mixs/MixPopoverAnimate/MixPopoverAnimate';

import { cnNotificationHeader, NotificationHeader } from '..';

type NotificationHeaderProps = React.ComponentProps<typeof NotificationHeader>;

const testId = 'NotificationHeader';

const renderComponent = (props: NotificationHeaderProps) => {
  return render(<NotificationHeader data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);
const getTitle = () =>
  getRender().querySelector(`.${cnNotificationHeader('Title')}`);
const getCloseButton = () =>
  getRender().querySelector(
    `.${cnNotificationHeader('CloseButton')}`,
  ) as HTMLElement;
const getActionButton = () =>
  getRender().querySelector(
    `.${cnNotificationHeader('Action')}`,
  ) as HTMLButtonElement;
const getContextMenu = () => screen.queryByRole('listbox') as HTMLElement;
const getContextMenuItems = () =>
  getContextMenu().querySelectorAll(`.ListItem`);
export const animateDelay = () =>
  act(() => {
    jest.advanceTimersByTime(animateTimeout);
  });

describe('Компонент NotificationHeader', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    it('прокидывает className', () => {
      const className = 'test-class-name';
      renderComponent({ className });

      expect(getRender()).toHaveClass(className);
    });

    it('прокидывает style', () => {
      const style = { color: 'red' };
      renderComponent({ style });

      expect(getRender()).toHaveStyle(style);
    });

    it('прокидывает ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ ref });

      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(getRender());
    });

    it('рендерит title', () => {
      const title = 'Test Title';
      renderComponent({ title });

      expect(getTitle()).toBeInTheDocument();
      expect(getTitle()).toHaveTextContent(title);
    });

    it('рендерит кнопку закрытия при наличии onClose', () => {
      const onClose = jest.fn();
      renderComponent({ onClose });

      expect(getCloseButton()).toBeInTheDocument();
    });

    it('не рендерит кнопку закрытия при отсутствии onClose', () => {
      renderComponent({});

      expect(getCloseButton()).not.toBeInTheDocument();
    });

    it('рендерит actions при их наличии', () => {
      jest.useFakeTimers();
      const actions = [
        { label: 'Action 1', onClick: jest.fn() },
        { label: 'Action 2', onClick: jest.fn() },
      ];
      act(() => {
        renderComponent({ actions });
      });

      fireEvent.click(getActionButton());

      animateDelay();

      expect(getContextMenuItems()).toHaveLength(actions.length);
    });

    it('рендерит иконку в кнопке закрытия', () => {
      const onClose = jest.fn();
      renderComponent({ onClose });

      expect(getCloseButton()?.querySelector('.IconClose')).toBeInTheDocument();
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onClose при клике на кнопку закрытия', () => {
      const onClose = jest.fn();
      renderComponent({ onClose });

      getCloseButton()?.click();

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('вызывает onClick при клике на action кнопку', () => {
      const actionClick = jest.fn();
      const actions = [{ label: 'Action', onClick: actionClick }];
      renderComponent({ actions });

      const actionButtons = getActionButton();
      actionButtons.click();

      expect(actionClick).toHaveBeenCalledTimes(1);
    });
  });
});
