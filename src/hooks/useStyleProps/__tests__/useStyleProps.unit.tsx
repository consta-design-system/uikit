import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { useStyleProps } from '../useStyleProps';

createRoot();
clearStack();

// Тест для одного свойства
const SinglePropComponent = () => {
  const [ref, color] = useStyleProps('color');

  // Сохраняем значение для проверки в тестах
  React.useEffect(() => {
    (window as any).testColorValue = color;
  }, [color]);

  return <div ref={ref} style={{ color: 'rgb(255, 0, 0)' }} />;
};

// Тест для нескольких свойств
const MultiplePropsComponent = () => {
  const [ref, vars] = useStyleProps(['color', 'font-size'] as const);

  // Сохраняем значения для проверки в тестах
  React.useEffect(() => {
    (window as any).testColorValue = vars.color;
    (window as any).testFontSizeValue = vars['font-size'];
  }, [vars]);

  return (
    <div ref={ref} style={{ color: 'rgb(255, 0, 0)', fontSize: '64px' }} />
  );
};

// Тест для одной CSS переменной
const SingleCssVarComponent = () => {
  const [ref, colorBgDefault] = useStyleProps('--test-color-var');

  // Сохраняем значение для проверки в тестах
  React.useEffect(() => {
    (window as any).testCssColorVariable = colorBgDefault;
  }, [colorBgDefault]);

  return (
    <div
      ref={ref}
      style={{
        // @ts-expect-error объявление css переменной
        '--test-color-var': 'rgb(255, 255, 255)',
        'backgroundColor': 'var(--test-color-var)',
      }}
    />
  );
};

// Тест для нескольких CSS переменных
const MultipleCssVarsComponent = () => {
  const [ref, vars] = useStyleProps([
    '--test-color-var',
    '--test-font-size-var',
  ] as const);

  // Сохраняем значения для проверки в тестах
  React.useEffect(() => {
    (window as any).testCssColorVariable = vars['--test-color-var'];
    (window as any).testCssFontSizeVariable = vars['--test-font-size-var'];
  }, [vars]);

  return (
    <div
      ref={ref}
      style={{
        // @ts-expect-error объявление css переменной
        '--test-color-var': 'rgb(255, 255, 255)',
        '--test-font-size-var': '128px',
        'backgroundColor': 'var(--test-color-var)',
        'fontSize': 'var(--test-font-size-var)',
      }}
    />
  );
};

const renderTestComponent = (
  ctx: TestContext,
  Component: React.ComponentType,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Component />
      </reatomContext.Provider>,
    );
  });
};

describe('Хук useStyleProps', () => {
  test('корректно возвращает 1 свойство', (ctx) =>
    context.start(async () => {
      renderTestComponent(ctx, SinglePropComponent);

      // Ждем, пока хук обработает значения
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 100);
      });

      expect((window as any).testColorValue).toBe('rgb(255, 0, 0)');
    }));

  test('корректно возвращает несколько свойств', (ctx) =>
    context.start(async () => {
      renderTestComponent(ctx, MultiplePropsComponent);

      // Ждем, пока хук обработает значения
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 100);
      });

      expect((window as any).testColorValue).toBe('rgb(255, 0, 0)');
      expect((window as any).testFontSizeValue).toBe('64px');
    }));

  test('корректно возвращает 1 css переменную', (ctx) =>
    context.start(async () => {
      renderTestComponent(ctx, SingleCssVarComponent);

      // Ждем, пока хук обработает значения
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 100);
      });

      expect((window as any).testCssColorVariable).toBe('rgb(255, 255, 255)');
    }));

  test('корректно возвращает несколько css переменных', (ctx) =>
    context.start(async () => {
      renderTestComponent(ctx, MultipleCssVarsComponent);

      // Ждем, пока хук обработает значения
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 100);
      });

      expect((window as any).testCssColorVariable).toBe('rgb(255, 255, 255)');
      expect((window as any).testCssFontSizeVariable).toBe('128px');
    }));
});
