import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useClickOutside } from '../useClickOutside';

const Element = (
  props: Partial<Parameters<typeof useClickOutside>[0]> & {
    children?: React.ReactNode;
  },
) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside({
    ...props,
    ignoreClicksInsideRefs: props.ignoreClicksInsideRefs ?? [ref],
  });
  return (
    <div data-testid="mockElement" ref={ref}>
      {props.children}
    </div>
  );
};

describe('Хук useClickOutside', () => {
  it('вызывает экшен при клике вне элемента при isActive=true', () => {
    const handler = jest.fn();
    render(
      <>
        <Element handler={handler} isActive />
        <div data-testid="outside" />
      </>,
    );

    const target = screen.getByTestId('outside');
    fireEvent.mouseDown(target);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent));

    const event = handler.mock.calls[0][0];
    expect(event).toHaveProperty('type', 'mousedown');
    expect(event).toHaveProperty('target', target);
  });

  it('не вызывает экшен при клике вне элемента при isActive=false', () => {
    const handler = jest.fn();
    render(
      <>
        <Element handler={handler} isActive={false} />
        <div data-testid="outside" />
      </>,
    );

    const target = screen.getByTestId('outside');
    fireEvent.mouseDown(target);

    expect(handler).not.toHaveBeenCalled();
  });

  it('не вызывает экшен, если isActive функция возвращает false', () => {
    const handler = jest.fn();
    render(
      <>
        <Element handler={handler} isActive={() => false} />
        <div data-testid="outside" />
      </>,
    );

    const target = screen.getByTestId('outside');
    fireEvent.mouseDown(target);

    expect(handler).not.toHaveBeenCalled();
  });

  it('вызывает экшен, если isActive функция возвращает true', () => {
    const handler = jest.fn();
    render(
      <>
        <Element handler={handler} isActive={() => true} />
        <div data-testid="outside" />
      </>,
    );

    const target = screen.getByTestId('outside');
    fireEvent.mouseDown(target);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent));

    const event = handler.mock.calls[0][0];
    expect(event).toHaveProperty('type', 'mousedown');
    expect(event).toHaveProperty('target', target);
  });

  it('не вызывает экшен при клике внутри дочернего элемента', () => {
    const handler = jest.fn();
    render(
      <Element handler={handler} isActive>
        <div data-testid="child" />
      </Element>,
    );

    const child = screen.getByTestId('child');
    fireEvent.mouseDown(child);

    expect(handler).not.toHaveBeenCalled();
  });

  it('не вызывает экшен при клике внутри одного из ignoreClicksInsideRefs', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const ref1 = React.useRef<HTMLDivElement>(null);
      const ref2 = React.useRef<HTMLDivElement>(null);
      useClickOutside({
        handler,
        isActive: true,
        ignoreClicksInsideRefs: [ref1, ref2],
      });
      return (
        <>
          <div ref={ref1} data-testid="inside1" />
          <div ref={ref2} data-testid="inside2" />
          <div data-testid="outside" />
        </>
      );
    };
    render(<TestComponent />);

    fireEvent.mouseDown(screen.getByTestId('inside1'));
    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(screen.getByTestId('inside2'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('вызывает экшен при клике вне всех ignoreClicksInsideRefs', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const ref1 = React.useRef<HTMLDivElement>(null);
      const ref2 = React.useRef<HTMLDivElement>(null);
      useClickOutside({
        handler,
        isActive: true,
        ignoreClicksInsideRefs: [ref1, ref2],
      });
      return (
        <>
          <div ref={ref1} data-testid="inside1" />
          <div ref={ref2} data-testid="inside2" />
          <div data-testid="outside" />
        </>
      );
    };
    render(<TestComponent />);

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('не вызывает экшен при клике внутри shadow DOM при ретаргетинге target на host', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const hostRef = React.useRef<HTMLDivElement>(null);
      const insideRef = React.useRef<HTMLDivElement | null>(null);

      useClickOutside({
        handler,
        isActive: true,
        ignoreClicksInsideRefs: [insideRef],
      });

      React.useEffect(() => {
        const host = hostRef.current;
        if (!host) {
          return;
        }

        const shadowRoot = host.attachShadow({ mode: 'open' });
        const inside = document.createElement('div');
        shadowRoot.appendChild(inside);
        insideRef.current = inside;
      }, []);

      return <div data-testid="shadow-host" ref={hostRef} />;
    };

    render(<TestComponent />);

    const host = screen.getByTestId('shadow-host');
    const shadowRoot = host.shadowRoot as ShadowRoot;
    const inside = shadowRoot.firstElementChild as HTMLDivElement;
    const event = createEvent.mouseDown(host);

    Object.defineProperty(event, 'composedPath', {
      value: () => [
        inside,
        shadowRoot,
        host,
        document.body,
        document.documentElement,
        document,
        window,
      ],
    });

    fireEvent(host, event);

    expect(handler).not.toHaveBeenCalled();
  });
});
