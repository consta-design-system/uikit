import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnNotificationItem, NotificationItem } from '..';
import { items } from '../__mocks__/data.mock';

type NotificationItemProps = React.ComponentProps<typeof NotificationItem>;

const testId = 'NotificationItem';

const renderComponent = (props: NotificationItemProps) => {
  return render(<NotificationItem data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);
const getTitle = () =>
  getRender().querySelector(`.${cnNotificationItem('Title')}`);
const getAvatar = () =>
  getRender().querySelector(`.${cnNotificationItem('Avatar')}`);
const getCaption = () =>
  getRender().querySelector(`.${cnNotificationItem('Caption')}`);
const getChildren = () =>
  getRender().querySelector(`.${cnNotificationItem('Children')}`);
const getBadge = () =>
  getRender().querySelector(`.${cnNotificationItem('Badge')}`);
const getActions = () =>
  getRender().querySelector(`.${cnNotificationItem('Actions')}`);

describe('Компонент NotificationItem', () => {
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

    it('рендерит content как строку', () => {
      const content = 'Test Content';
      renderComponent({ content });

      expect(getChildren()).toBeInTheDocument();
      expect(getChildren()).toHaveTextContent(content);
    });

    it('рендерит userName и userImageUrl в Avatar', () => {
      const userName = 'Test User';
      const userImageUrl = 'test-url';
      renderComponent({ userName, userImageUrl });

      expect(getAvatar()).toBeInTheDocument();
      expect(getRender()).toHaveClass(cnNotificationItem({ withAvatar: true }));
    });

    it('рендерит caption', () => {
      const caption = 'Test Caption';
      renderComponent({ caption });

      expect(getCaption()).toBeInTheDocument();
      expect(getCaption()).toHaveTextContent(caption);
    });

    it('рендерит Badge при read=false', () => {
      const title = 'Test Title';
      renderComponent({ title, read: false });

      expect(getBadge()).toBeInTheDocument();
    });

    it('не рендерит Badge при read=true', () => {
      const title = 'Test Title';
      renderComponent({ title, read: true });

      expect(getBadge()).not.toBeInTheDocument();
    });

    it('рендерит actions', () => {
      const { actions } = items[0];
      renderComponent({ actions });

      expect(getActions()).toBeInTheDocument();
    });

    it('проставляет класс clickable при наличии onClick', () => {
      const onClick = jest.fn();
      renderComponent({ onClick });

      expect(getRender()).toHaveClass(cnNotificationItem({ clickable: true }));
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onClick при клике', () => {
      const onClick = jest.fn();
      renderComponent({ onClick });

      fireEvent.click(getRender());

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
