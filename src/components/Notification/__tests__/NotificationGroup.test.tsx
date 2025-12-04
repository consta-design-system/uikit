import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { animateTimeout } from '##/mixs/MixPopoverAnimate/MixPopoverAnimate';

import { NotificationGroup } from '..';

const testId = 'NotificationGroup';
const getRender = () => screen.getByTestId(testId);
const getActionButton = () =>
  getRender().querySelector('button') as HTMLButtonElement;
const buttonActionClick = () => fireEvent.click(getActionButton());
const animateDelay = () =>
  act(() => {
    jest.advanceTimersByTime(animateTimeout);
  });

type NotificationGroupProps = React.ComponentProps<typeof NotificationGroup>;

const renderComponent = (props: NotificationGroupProps) => {
  return render(<NotificationGroup data-testid={testId} {...props} />);
};

describe('Компонент NotificationGroup', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    it('прокидывает className', () => {
      const className = 'test-class-name';
      renderComponent({ title: 'test', className });

      expect(getRender()).toHaveClass(className);
    });

    it('прокидывает ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ title: 'test', ref });

      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(getRender());
    });

    it('рендерит title', () => {
      const title = 'test title';
      renderComponent({ title });

      expect(getRender()).toHaveTextContent(title);
    });

    it('рендерит actions', () => {
      jest.useFakeTimers();
      const actions = [
        { label: 'action1', onClick: () => {} },
        { label: 'action2', onClick: () => {} },
      ];

      act(() => {
        renderComponent({ title: 'test', actions });
      });

      buttonActionClick();
      animateDelay();

      expect(screen.getByText(actions[0].label)).toBeInTheDocument();
      expect(screen.getByText(actions[1].label)).toBeInTheDocument();
    });

    it('не рендерится если нет title', () => {
      const { container } = renderComponent({});

      expect(container.firstChild).toBeNull();
    });
  });
});
