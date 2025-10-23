import './ModalLayout.css';

import React, { forwardRef } from 'react';

import { cnMixSpace, MixSpaceProps } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { isNotNil } from '##/utils/type-guards';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export const cnModalLayout = cn('ModalLayout');

type ModalLayoutProps = PropsWithHTMLAttributes<
  {
    children?: React.ReactNode;
    fixed?: boolean | [boolean, boolean];
    border?: boolean | [boolean, boolean];
    space?: MixSpaceProps | (MixSpaceProps | undefined)[];
  },
  HTMLDivElement
>;

const getSlotProp = <T,>(
  prop: T | (T | undefined)[] | undefined,
  index: number,
) => (Array.isArray(prop) ? prop[index] : prop);

const childrenToArray = (children: React.ReactNode): React.ReactNode[] =>
  (Array.isArray(children) ? children : [children]).filter(isNotNil);

const getSlotPropFirstOrLast = (
  border: boolean | [boolean, boolean] | undefined,
  index: number,
  slots: React.ReactNode[],
  value: [string, string],
) => {
  const { length } = slots;
  if (index === 0) {
    return getSlotProp(border, 0) ? value[0] : undefined;
  }

  if (index === length - 1) {
    return getSlotProp(border, 1) ? value[1] : undefined;
  }
};

export const ModalLayout = forwardRef<HTMLDivElement, ModalLayoutProps>(
  (props, ref) => {
    const { children, className, border, space, fixed, ...otherProps } = props;

    const slots = childrenToArray(children);

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnModalLayout(null, [className])}
      >
        {slots.map((child, index) => (
          <div
            key={index}
            className={cnModalLayout(
              'Slot',
              {
                fixed: getSlotPropFirstOrLast(fixed, index, slots, [
                  'top',
                  'bottom',
                ]),
                border: getSlotPropFirstOrLast(border, index, slots, [
                  'bottom ',
                  'top',
                ]),
                stretch:
                  (index === slots.length - 2 && getSlotProp(fixed, 1)) ||
                  (index === slots.length - 1 && !getSlotProp(fixed, 1)),
              },
              [cnMixSpace(getSlotProp(space, index))],
            )}
          >
            {child}
          </div>
        ))}
      </div>
    );
  },
);
