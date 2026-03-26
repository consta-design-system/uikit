import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { useForkRef } from '../useForkRef';

createRoot();
clearStack();

const TestComponentWithRefs = ({
  ctx,
  useSecondRef,
}: {
  ctx: TestContext;
  useSecondRef?: boolean;
}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  const Component = () => {
    const ref1 = React.useRef<HTMLDivElement>(null);
    const ref2 = React.useRef<HTMLDivElement>(null);
    const combinedRef = useForkRef([ref1, useSecondRef ? ref2 : undefined]);

    // Сохраняем ссылки для проверки в тестах
    React.useEffect(() => {
      (window as any).testRefs = { ref1, ref2 };
    }, [ref1, ref2, useSecondRef]);

    return <div data-testid="test-element" ref={combinedRef} />;
  };

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Component />
      </reatomContext.Provider>,
    );
  });

  return null;
};

const TestComponentWithCallbackRefs = ({ ctx }: { ctx: TestContext }) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  const Component = () => {
    const [refValue1, setRefValue1] = React.useState<HTMLDivElement | null>(
      null,
    );
    const ref1 = (node: HTMLDivElement | null) => {
      setRefValue1(node);
    };
    const ref2 = React.useRef<HTMLDivElement>(null);
    const combinedRef = useForkRef([ref1, ref2]);

    // Сохраняем ссылки для проверки в тестах
    React.useEffect(() => {
      (window as any).testRefs = { refValue1, ref2 };
    }, [refValue1, ref2]);

    return <div data-testid="test-element" ref={combinedRef} />;
  };

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Component />
      </reatomContext.Provider>,
    );
  });

  return null;
};

const getElement = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="test-element"]`,
  ) as HTMLElement;

describe.concurrent('Хук useForkRef', () => {
  test('должен корректно объединять refs', (ctx) =>
    context.start(async () => {
      TestComponentWithRefs({ ctx, useSecondRef: true });

      const element = getElement(ctx);

      const { testRefs } = window as any;

      expect(testRefs.ref1.current).toBe(element);
      expect(testRefs.ref2.current).toBe(element);
    }));

  test('должен работать с callback refs', (ctx) =>
    context.start(async () => {
      TestComponentWithCallbackRefs({ ctx });

      const element = getElement(ctx);

      const { testRefs } = window as any;
      expect(testRefs.refValue1).toBe(element);
      expect(testRefs.ref2.current).toBe(element);
    }));

  test('должен игнорировать null и undefined', (ctx) =>
    context.start(async () => {
      TestComponentWithRefs({ ctx });

      const element = getElement(ctx);

      const { testRefs } = window as any;
      expect(testRefs.ref1.current).toBe(element);
    }));

  test('должен корректно работать при обновлении refs', (ctx) =>
    context.start(async () => {
      TestComponentWithRefs({ ctx, useSecondRef: false });

      let { testRefs } = window as any;
      expect(testRefs.ref1.current).toBe(getElement(ctx));
      expect(testRefs.ref2.current).toBeNull();

      // Для демонстрации обновления refs, создадим новый компонент с useSecondRef = true
      TestComponentWithRefs({ ctx, useSecondRef: true });

      testRefs = (window as any).testRefs;

      expect(testRefs.ref1.current).toBe(getElement(ctx));
      expect(testRefs.ref2.current).toBe(getElement(ctx));
    }));
});
