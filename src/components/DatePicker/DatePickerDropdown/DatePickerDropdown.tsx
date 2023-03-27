import './DatePickerDropdown.css';

import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { useFlag } from '../../../hooks/useFlag/useFlag';
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
  DateTimePropOnChange,
  DateTimePropType,
  MoveType,
} from '../../DateTime/DateTime';
import { Direction, Popover } from '../../Popover/Popover';
import { DatePickerAdditionalControls } from '../DatePickerAdditionalControls/DatePickerAdditionalControls';
import {
  DatePickerAdditionalControlRenderProp,
  DatePickerPropDateTimeView,
  DatePickerPropDropdownForm,
  datePickerPropDropdownFormDefault,
} from '../types';

export type DatePickerDropdownPropOnChange = DateTimePropOnChange;

export type DatePickerDropdownProps = PropsWithHTMLAttributesAndRef<
  {
    anchorRef: React.RefObject<HTMLElement>;
    currentVisibleDate?: Date;
    type: DateTimePropType;
    value?: Date | DateRange;
    onChange?: DatePickerDropdownPropOnChange;
    minDate?: Date;
    maxDate?: Date;
    events?: Date[];
    view: DatePickerPropDateTimeView;
    locale?: Locale;
    children?: never;
    form?: DatePickerPropDropdownForm;
    isOpen?: boolean;
    onChangeCurrentVisibleDate?: (date: Date) => void;
    zIndex?: number;
    renderAdditionalControls?: DatePickerAdditionalControlRenderProp;
    multiplicitySeconds?: number;
    multiplicityMinutes?: number;
    multiplicityHours?: number;
    timeFor?: 'start' | 'end';
  },
  HTMLDivElement
>;

type DatePickerDropdownComponent = (
  props: DatePickerDropdownProps,
) => React.ReactElement | null;

const moveMap: Record<DateTimePropType, MoveType> = {
  'year': 'year',
  'month': 'month',
  'date': 'day',
  'time': 'time',
  'date-time': 'day',
};

const cnDatePickerDropdown = cn('DatePickerDropdown');

export const DatePickerDropdown: DatePickerDropdownComponent = forwardRef(
  (props, componentRef) => {
    const {
      form = datePickerPropDropdownFormDefault,
      anchorRef,
      isOpen,
      className,
      zIndex,
      renderAdditionalControls,
      ...otherProps
    } = props;

    const rootRef = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useState<Direction>();

    const [visibleAdditionalControls, setVisibleAdditionalControls] =
      useFlag(true);

    const onMove = useCallback(
      (to: MoveType) => {
        to === moveMap[props.type]
          ? setVisibleAdditionalControls.on()
          : setVisibleAdditionalControls.off();
      },
      [props.type],
    );

    const ref = useForkRef([componentRef, rootRef]);

    return (
      <Transition
        in={isOpen}
        unmountOnExit
        timeout={animateTimeout}
        nodeRef={rootRef}
      >
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
              possibleDirections={[
                'downStartLeft',
                'upStartLeft',
                'downStartRight',
                'upStartRight',
              ]}
              style={{ zIndex }}
              role="listbox"
              onSetDirection={setDirection}
            >
              <DateTime {...otherProps} onMove={onMove} />
              {visibleAdditionalControls && (
                <DatePickerAdditionalControls
                  currentVisibleDate={props.currentVisibleDate}
                  renderAdditionalControls={renderAdditionalControls}
                  type={props.type}
                  view={props.view}
                />
              )}
            </Popover>
          );
        }}
      </Transition>
    );
  },
);
