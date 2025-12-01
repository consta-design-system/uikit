import { render, screen } from '@testing-library/react';
import React from 'react';

import { useForkRef } from '../useForkRef';

describe('Хук useForkRef', () => {
  it('должен корректно объединять refs', () => {
    let ref1: React.MutableRefObject<HTMLDivElement | undefined>;
    let ref2: React.MutableRefObject<HTMLDivElement | undefined>;

    const TestComponent = () => {
      ref1 = React.useRef<HTMLDivElement>();
      ref2 = React.useRef<HTMLDivElement>();
      const combinedRef = useForkRef([ref1, ref2]);
      return <div data-testid="test-element" ref={combinedRef} />;
    };

    render(<TestComponent />);
    const element = screen.getByTestId('test-element');

    expect(ref1!.current).toBe(element);
    expect(ref2!.current).toBe(element);
  });

  it('должен работать с callback refs', () => {
    let refValue1: HTMLDivElement | null = null;
    const ref1 = (node: HTMLDivElement | null) => {
      refValue1 = node;
    };
    let ref2: React.MutableRefObject<HTMLDivElement | null>;

    const TestComponent = () => {
      ref2 = React.useRef<HTMLDivElement>(null);
      const combinedRef = useForkRef([ref1, ref2]);
      return <div data-testid="test-element" ref={combinedRef} />;
    };

    render(<TestComponent />);
    const element = screen.getByTestId('test-element');

    expect(refValue1).toBe(element);
    expect(ref2!.current).toBe(element);
  });

  it('должен игнорировать null и undefined', () => {
    let ref1: React.MutableRefObject<HTMLDivElement | null>;

    const TestComponent = () => {
      ref1 = React.useRef<HTMLDivElement>(null);
      const combinedRef = useForkRef([ref1, null, undefined]);
      return <div data-testid="test-element" ref={combinedRef} />;
    };

    render(<TestComponent />);
    const element = screen.getByTestId('test-element');

    expect(ref1!.current).toBe(element);
  });

  it('должен корректно работать при обновлении refs', () => {
    let ref1: React.MutableRefObject<HTMLDivElement | null>;
    let ref2: React.MutableRefObject<HTMLDivElement | null>;

    const TestComponent = ({ useSecondRef }: { useSecondRef: boolean }) => {
      ref1 = React.useRef<HTMLDivElement>(null);
      ref2 = React.useRef<HTMLDivElement>(null);
      const combinedRef = useForkRef([ref1, useSecondRef ? ref2 : undefined]);
      return <div data-testid="test-element" ref={combinedRef} />;
    };

    const { rerender } = render(<TestComponent useSecondRef={false} />);
    const element = screen.getByTestId('test-element');

    expect(ref1!.current).toBe(element);
    expect(ref2!.current).toBeNull();

    rerender(<TestComponent useSecondRef />);

    expect(ref1!.current).toBe(element);
    expect(ref2!.current).toBe(element);
  });
});
