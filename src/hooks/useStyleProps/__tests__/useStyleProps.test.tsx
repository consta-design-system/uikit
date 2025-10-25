import { render } from '@testing-library/react';
import React from 'react';

import { useStyleProps } from '../useStyleProps';

describe('Хук useStyleProps', () => {
  it('корректно возвращает 1 свойство', () => {
    let colorValue: string | undefined;

    const Element = () => {
      const [ref, color] = useStyleProps('color');
      colorValue = color;

      return <div ref={ref} style={{ color: 'rgb(255, 0, 0)' }} />;
    };

    render(<Element />);

    expect(colorValue).toBe('rgb(255, 0, 0)');
  });

  it('корректно возвращает несколько свойств', () => {
    let colorValue: string | undefined;
    let fontSizeValue: string | undefined;

    const Element = () => {
      const [ref, vars] = useStyleProps(['color', 'font-size'] as const);
      colorValue = vars.color;
      fontSizeValue = vars['font-size'];

      return (
        <div ref={ref} style={{ color: 'rgb(255, 0, 0)', fontSize: '64px' }} />
      );
    };

    render(<Element />);

    expect(colorValue).toBe('rgb(255, 0, 0)');
    expect(fontSizeValue).toBe('64px');
  });

  it('корректно возвращает 1 css переменную', () => {
    let cssColorVariable: string | undefined;

    const Element = () => {
      const [ref, colorBgDefault] = useStyleProps('--test-color-var');
      cssColorVariable = colorBgDefault;

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

    render(<Element />);

    expect(cssColorVariable).toBe('rgb(255, 255, 255)');
  });

  it('корректно возвращает несколько css переменных', () => {
    let cssColorVariable: string | undefined;
    let cssFontSizeVariable: string | undefined;

    const Element = () => {
      const [ref, vars] = useStyleProps([
        '--test-color-var',
        '--test-font-size-var',
      ] as const);
      cssColorVariable = vars['--test-color-var'];
      cssFontSizeVariable = vars['--test-font-size-var'];

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

    render(<Element />);

    expect(cssColorVariable).toBe('rgb(255, 255, 255)');
    expect(cssFontSizeVariable).toBe('128px');
  });
});
