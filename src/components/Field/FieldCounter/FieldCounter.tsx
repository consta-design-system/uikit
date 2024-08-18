import './FieldCounter.css';

import { IconSelect } from '@consta/icons/IconSelect';
import React, { forwardRef } from 'react';

import { FieldButton } from '##/components/Field';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type FieldCounterProps = PropsWithHTMLAttributesAndRef<
  {
    children?: never;
  },
  HTMLDivElement
>;

export const cnFieldCounter = cn('FieldCounter');

export const FieldCounter = forwardRef<HTMLDivElement, FieldCounterProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={cnFieldCounter(null, [className])}>
        <FieldButton
          className={cnFieldCounter('Button', { counter: 'increment' })}
        >
          <IconSelect size="xs" />
        </FieldButton>
        <FieldButton
          className={cnFieldCounter('Button', { counter: 'decrement' })}
        >
          <IconSelect size="xs" />
        </FieldButton>
      </div>
    );
  },
);
