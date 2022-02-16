import './DatePickerDropdown.css';

import React, { forwardRef, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '../../../mixs/MixPopoverAnimate/MixPopoverAnimate';
import { cn } from '../../../utils/bem';
import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import {
  DateTime,
  DateTimeAdditionalControlRenderProp,
  DateTimePropOnChange,
  DateTimePropType,
} from '../../DateTimeCanary/DateTimeCanary';
import { Direction, Popover } from '../../Popover/Popover';
import {
  DatePickerPropDateTimeView,
  DatePickerPropDropdownForm,
  datePickerPropDropdownFormDefault,
} from '../helpers';

export type DatePickerDropdownPropOnChange = DateTimePropOnChange;

export type DatePickerDropdownProps = PropsWithHTMLAttributesAndRef<
  {
    anchorRef: React.RefObject<HTMLElement>;
    currentVisibleDate?: Date;
    type?: DateTimePropType;
    value?: Date | DateRange;
    onChange?: DatePickerDropdownPropOnChange;
    minDate?: Date;
    maxDate?: Date;
    events?: Date[];
    view?: DatePickerPropDateTimeView;
    locale?: Locale;
    children?: never;
    form?: DatePickerPropDropdownForm;
    isOpen?: boolean;
    onChangeCurrentVisibleDate?: (date: Date) => void;
    zIndex?: number;
    renderAdditionalControls?: DateTimeAdditionalControlRenderProp;
    multiplicitySeconds?: number;
    multiplicityMinutes?: number;
    multiplicityHours?: number;
    timeFor?: 'start' | 'end';
  },
  HTMLDivElement
>;

type DatePickerDropdownComponent = (props: DatePickerDropdownProps) => React.ReactElement | null;

const cnDatePickerDropdown = cn('DatePickerDropdown');

export const DatePickerDropdown: DatePickerDropdownComponent = forwardRef((props, componentRef) => {
  const {
    form = datePickerPropDropdownFormDefault,
    anchorRef,
    isOpen,
    className,
    zIndex,
    ...otherProps
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>();

  const ref = useForkRef([componentRef, rootRef]);

  return (
    <Transition in={isOpen} unmountOnExit timeout={animateTimeout} nodeRef={rootRef}>
      {(animate) => {
        return (
          <Popover
            ref={ref}
            anchorRef={anchorRef}
            className={cnDatePickerDropdown({ form }, [
              className,
              cnMixPopoverAnimate({ direction, animate }),
            ])}
            direction="downStartLeft"
            spareDirection="downStartLeft"
            possibleDirections={['downStartLeft', 'upStartLeft', 'downStartRight', 'upStartRight']}
            style={{ zIndex }}
            role="listbox"
            onSetDirection={setDirection}
          >
            <DateTime {...otherProps} />
          </Popover>
        );
      }}
    </Transition>
  );
});
