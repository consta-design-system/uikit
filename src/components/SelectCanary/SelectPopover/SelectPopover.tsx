import { classnames } from '@bem-react/classnames';
import { AtomMut } from '@reatom/framework';
import { reatomComponent } from '@reatom/npm-react';
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { FieldPropSize } from '##/components/FieldComponents';
import { cnListBox } from '##/components/ListCanary';
import { Popover, PopoverPropOffset } from '##/components/Popover';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '##/mixs/MixPopoverAnimate/MixPopoverAnimate';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

export const SelectPopoverForm = ['default', 'brick', 'round'] as const;
export type SelectPopoverPropForm = typeof SelectPopoverForm[number];
export const defaultSelectPopoverPropForm = SelectPopoverForm[0];

type Props = PropsWithJsxAttributes<{
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  form: SelectPopoverPropForm;
  openAtom: AtomMut<boolean>;
  size: FieldPropSize;
  offset?: PopoverPropOffset | 'none';
  anchorRef: React.RefObject<HTMLElement> | undefined;
  children: React.ReactNode;
}>;

export const SelectPopover = reatomComponent<Props>((props) => {
  const {
    ctx,
    size,
    className,
    openAtom,
    offset: offsetProp = 'none',
    controlRef,
    form,
    anchorRef,
    children,
    ...otherProps
  } = props;

  const offset = offsetProp === 'none' ? undefined : offsetProp;

  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <Transition
      in={ctx.spy(openAtom)}
      nodeRef={popoverRef}
      timeout={animateTimeout}
      unmountOnExit
    >
      {(animate) => {
        return (
          <Popover
            {...otherProps}
            anchorRef={anchorRef}
            direction="downStartLeft"
            possibleDirections={[
              'downStartLeft',
              'upStartLeft',
              'downStartRight',
              'upStartRight',
            ]}
            offset={offset}
            ref={popoverRef}
            role="listbox"
            className={classnames(
              className,
              cnListBox({ size, form, border: true, shadow: true }),
              cnMixPopoverAnimate({ animate }),
            )}
            equalAnchorWidth
          >
            {children}
          </Popover>
        );
      }}
    </Transition>
  );
});
