import { IconSelect } from '@consta/icons/IconSelect';
import React, { forwardRef } from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { cnFieldButtonStyleReset } from '../FieldButtonStyleReset';
import { cnFieldCounter } from './cnFieldCounter';

type FieldCounterProps = PropsWithHTMLAttributesAndRef<
  {
    children?: never;
    onIncrementClick?: React.MouseEventHandler<HTMLButtonElement>;
    onDecrementClick?: React.MouseEventHandler<HTMLButtonElement>;
    onIncrementFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onDecrementFocus?: React.FocusEventHandler<HTMLButtonElement>;
  },
  HTMLDivElement
>;

export const FieldCounter = forwardRef<HTMLDivElement, FieldCounterProps>(
  (
    {
      className,
      onIncrementClick,
      onDecrementClick,
      onIncrementFocus,
      onDecrementFocus,
      ...props
    },
    ref,
  ) => {
    return (
      <div {...props} ref={ref} className={cnFieldCounter(null, [className])}>
        <button
          className={cnFieldCounter('Button', { counter: 'increment' }, [
            cnFieldButtonStyleReset(),
          ])}
          type="button"
          onClick={onIncrementClick}
          onFocus={onIncrementFocus}
          tabIndex={-1}
        >
          <IconSelect size="xs" />
        </button>
        <button
          className={cnFieldCounter('Button', { counter: 'decrement' }, [
            cnFieldButtonStyleReset(),
          ])}
          type="button"
          onClick={onDecrementClick}
          tabIndex={-1}
        >
          <IconSelect size="xs" />
        </button>
      </div>
    );
  },
);
