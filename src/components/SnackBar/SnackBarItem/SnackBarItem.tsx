import '../../Theme/_color/Theme_color_gpnDark.css';
import './SnackBarItem.css';

import { IconClose } from '@consta/icons/IconClose';
import React, { useEffect, useState } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { cn } from '../../../utils/bem';
import { isNumber, isString } from '../../../utils/type-guards';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { cnTheme } from '../../Theme/Theme';
import { SnackBarActionButton } from '../SnackBarActionButton/SnackBarActionButton';
import { SnackBarLine } from '../SnackBarLine/SnackBarLine';
import { SnackBarTimer } from '../SnackBarTimer/SnackBarTimer';
import {
  SnackBarItemComponent,
  SnackBarItemProps,
  snackBarItemStatusDefault,
  snackBarPropFormDefault,
  SnackBarTimerPropOnMount,
} from '../types';

const defaultInitialTimerTime = 3;

export const cnSnackBarItem = cn('SnackBarItem');

const getAutoCloseTime = (
  autoClose: boolean | number | undefined,
): number | false => {
  if (autoClose) {
    if (typeof autoClose === 'number') {
      return autoClose;
    }
    return defaultInitialTimerTime;
  }
  return false;
};

export const SnackBarItemRender = (
  props: SnackBarItemProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    onClose,
    autoClose,
    showProgress,
    icon: Icon,
    form = snackBarPropFormDefault,
    message,
    actions,
    status = snackBarItemStatusDefault,
    onAutoClose: onAutoCloseProp,
    className,
    ...otherProps
  } = props;

  const [timerFunctions, setTimerFunctions] = useState<{
    start: () => void;
    pause: () => void;
  } | null>(null);
  const [hover, { on: onHover, off: offHover }] = useFlag(false);
  const [timeIsOver, { on: onTimeIsOver }] = useFlag(false);
  const handleMountTimer: SnackBarTimerPropOnMount = (timerFunctions) =>
    setTimerFunctions(timerFunctions);
  const handleMouseEnter = () => onHover();
  const handleMouseLeave = () => offHover();
  const autoCloseTime = getAutoCloseTime(autoClose);
  const hideAutoCloseTimer =
    showProgress === undefined ||
    !(isNumber(autoCloseTime) && autoCloseTime > 0);
  const onAutoClose = () => {
    if (onAutoCloseProp) {
      onAutoCloseProp();
    } else {
      onClose?.();
    }
  };

  useEffect(() => {
    if (!timeIsOver) {
      if (hover) {
        timerFunctions && timerFunctions.pause();
      } else {
        timerFunctions && timerFunctions.start();
      }
    }
  }, [hover, timeIsOver, timerFunctions]);

  const handleTimeIsOver = () => {
    onTimeIsOver();
    onAutoClose();
  };

  const handleClose = onClose ? () => onClose() : undefined;

  return (
    <div
      ref={ref}
      className={cnSnackBarItem({ status, showProgress, form }, [
        cnTheme({ color: 'gpnDark' }),
        className,
      ])}
      onMouseEnter={autoCloseTime ? handleMouseEnter : undefined}
      onMouseLeave={autoCloseTime ? handleMouseLeave : undefined}
      {...otherProps}
    >
      {autoCloseTime && showProgress !== 'line' && (
        <SnackBarTimer
          className={cnSnackBarItem('Timer')}
          onMount={handleMountTimer}
          onTimeIsOver={handleTimeIsOver}
          startTime={autoCloseTime}
          hidden={hideAutoCloseTimer}
        />
      )}
      {Icon &&
        ((hideAutoCloseTimer && showProgress === 'timer') ||
          showProgress !== 'timer') && (
          <Icon className={cnSnackBarItem('Icon')} size="m" />
        )}
      <div className={cnSnackBarItem('Content')}>
        {isString(message) || isNumber(message) ? (
          <Text className={cnSnackBarItem('Message')} lineHeight="s">
            {message}
          </Text>
        ) : (
          message
        )}
        {actions && (
          <SnackBarActionButton
            actions={actions}
            className={cnSnackBarItem('ActionButton')}
          />
        )}
      </div>
      {onClose && (
        <Button
          className={cnSnackBarItem('CloseButton')}
          view="clear"
          iconLeft={IconClose}
          form="round"
          type="button"
          size="xs"
          onClick={handleClose}
        />
      )}
      {autoCloseTime && showProgress === 'line' && (
        <SnackBarLine
          className={cnSnackBarItem('Line')}
          onMount={handleMountTimer}
          onTimeIsOver={handleTimeIsOver}
          startTime={autoCloseTime}
        />
      )}
    </div>
  );
};

export const SnackBarItem = React.forwardRef(
  SnackBarItemRender,
) as SnackBarItemComponent;
