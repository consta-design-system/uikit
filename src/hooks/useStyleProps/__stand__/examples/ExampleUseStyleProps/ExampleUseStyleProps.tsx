import { Example } from '@consta/stand';
import React from 'react';

import { useStyleProps } from '##/hooks/useStyleProps';

export const ExampleUseStylePropsGetProp = () => {
  const [ref, color] = useStyleProps('color');

  return (
    <Example col={1}>
      <div ref={ref}>color: {color};</div>
    </Example>
  );
};

export const ExampleUseStylePropsGetProps = () => {
  const [ref, { color, font }] = useStyleProps(['color', 'font'] as const);

  return (
    <Example col={1}>
      <div ref={ref}>
        <div>color: {color};</div>
        <div>font: {font};</div>
      </div>
    </Example>
  );
};

export const ExampleUseStylePropsGetVar = () => {
  const [ref, colorBgDefault] = useStyleProps('--color-bg-default');

  return (
    <Example col={1}>
      <div ref={ref}>--color-bg-default: {colorBgDefault};</div>
    </Example>
  );
};

export const ExampleUseStylePropsGetVars = () => {
  const [ref, vars] = useStyleProps([
    '--color-bg-default',
    '--space-m',
    '--size-text-m',
  ] as const);

  return (
    <Example col={1}>
      <div ref={ref}>
        <div>--color-bg-default: {vars['--color-bg-default']};</div>
        <div>--space-m: {vars['--space-m']};</div>
        <div>--size-text-m: {vars['--space-m']};</div>
      </div>
    </Example>
  );
};
