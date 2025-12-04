import { render, screen } from '@testing-library/react';
import React from 'react';

import { NotificationCaption } from '..';

type NotificationCaptionProps = React.ComponentProps<
  typeof NotificationCaption
>;

const testId = 'NotificationCaption';

const renderComponent = (props: NotificationCaptionProps) => {
  return render(<NotificationCaption data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);

describe('Компонент NotificationCaption', () => {
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
      const ref = React.createRef<HTMLSpanElement>();
      renderComponent({ ref });

      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(getRender());
    });

    it('рендерит children', () => {
      const children = 'test children';
      renderComponent({ children });

      expect(getRender()).toHaveTextContent(children);
    });
  });
});
