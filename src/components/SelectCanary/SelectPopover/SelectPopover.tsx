import { classnames } from '@bem-react/classnames';
import { AtomLike, computed } from '@reatom/core';
import React from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import { cnListBox } from '##/components/ListCanary';
import { Popover, PopoverPropOffset } from '##/components/Popover';
import { Transition, TransitionStatus } from '##/components/Transition';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '##/mixs/MixPopoverAnimate/MixPopoverAnimate';
import { factoryComponent } from '##/utils/state';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

export const SelectPopoverForm = ['default', 'brick', 'round'] as const;
export type SelectPopoverPropForm = (typeof SelectPopoverForm)[number];
export const defaultSelectPopoverPropForm = SelectPopoverForm[0];

type Props = PropsWithJsxAttributes<{
  form: SelectPopoverPropForm;
  openAtom: AtomLike<boolean>;
  size: FieldPropSize;
  offset?: PopoverPropOffset | 'none';
  controlElAtom: AtomLike<HTMLDivElement | null>;
  children: React.ReactNode;
  onMount?: (isMount: boolean) => void;
  viewportRef?: React.RefObject<HTMLElement | null>;
  container?: Element;
}>;

export const SelectPopover = factoryComponent<HTMLDivElement, Props>(
  ({ controlElAtom }) => {
    const anchorRefAtom = computed(() => ({
      current: controlElAtom(),
    }));

    return (props) => {
      const {
        size,
        className,
        openAtom,
        offset: offsetProp = 'none',
        form,
        controlElAtom,
        children,
        onMount,
        container,
        viewportRef,
        ...otherProps
      } = props;
      const offset = offsetProp === 'none' ? undefined : offsetProp;

      return (
        <Transition in={openAtom()} timeout={animateTimeout} unmountOnExit>
          {(animate: TransitionStatus) => {
            return (
              <Popover
                {...otherProps}
                viewportRef={viewportRef}
                anchorRef={anchorRefAtom()}
                container={container}
                direction="downStartLeft"
                possibleDirections={[
                  'downStartLeft',
                  'upStartLeft',
                  'downStartRight',
                  'upStartRight',
                ]}
                offset={offset}
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
    };
  },
);
