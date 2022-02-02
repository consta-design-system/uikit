import '../../Theme/_color/Theme_color_gpnDark.css';
import './SnackBarItem.css';

import React, { useEffect, useState } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { IconClose } from '../../../icons/IconClose/IconClose';
import { cn } from '../../../utils/bem';
import { isNumber, isString } from '../../../utils/type-guards';
import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { cnTheme } from '../../Theme/Theme';
import {
  Item,
  SnackBarItemProps,
  snackBarItemStatusDefault,
  SnackBarTimerPropOnMount,
} from '../helper';
import { SnackBarActionButton } from '../SnackBarActionButton/SnackBarActionButton';
import { SnackBarLine } from '../SnackBarLine/SnackBarLine';
import { SnackBarTimer } from '../SnackBarTimer/SnackBarTimer';

type SnackBarItemComponent = (
  props: PropsWithHTMLAttributesAndRef<SnackBarItemProps, HTMLDivElement>,
) => React.ReactElement | null;

const defaultInitialTimerTime = 3;

export const cnSnackBarItem = cn('SnackBarItem');

const getAutoCloseTime = (autoClose: boolean | number | undefined): number | false => {
  if (autoClose) {
    if (typeof autoClose === 'number') {
      return autoClose;
    }
    return defaultInitialTimerTime;
  }
  return false;
};

export const SnackBarItem: SnackBarItemComponent = React.forwardRef((props, ref) => {
  const { item, className } = props;
  const {
    onClose,
    autoClose,
    showProgress,
    icon: Icon,
    message,
    actions,
    status = snackBarItemStatusDefault,
    onAutoClose: onAutoCloseProp,
  } = item;
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
    showProgress === undefined || !(isNumber(autoCloseTime) && autoCloseTime > 0);
  const onAutoClose = (item: Item) => {
    if (onAutoCloseProp) {
      onAutoCloseProp(item);
    } else {
      onClose && onClose(item);
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
    onAutoClose(item);
  };

  const handleClose = onClose ? () => onClose(item) : undefined;

  return (
    <div
      ref={ref}
      className={cnSnackBarItem({ status, showProgress }, [
        cnTheme({ color: 'gpnDark' }),
        className,
      ])}
      onMouseEnter={autoCloseTime ? handleMouseEnter : undefined}
      onMouseLeave={autoCloseTime ? handleMouseLeave : undefined}
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
      {hideAutoCloseTimer && Icon && <Icon className={cnSnackBarItem('Icon')} size="m" />}
      <div className={cnSnackBarItem('Content')}>
        {isString(message) || isNumber(message) ? (
          <Text className={cnSnackBarItem('Message')} lineHeight="s">
            {message}
          </Text>
        ) : (
          <>{message}</>
        )}
        {actions && (
          <SnackBarActionButton actions={actions} className={cnSnackBarItem('ActionButton')} />
        )}
      </div>
      {onClose && (
        <Button
          className={cnSnackBarItem('CloseButton')}
          view="clear"
          iconLeft={IconClose}
          form="round"
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
});
