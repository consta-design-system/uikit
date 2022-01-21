import '../../Theme/_color/Theme_color_gpnDark.css';
import './SnackBar-Item.css';

import React, { useEffect, useState } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { IconClose } from '../../../icons/IconClose/IconClose';
import { isNumber, isString } from '../../../utils/type-guards';
import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { cnTheme } from '../../Theme/Theme';
import { SnackBarActionButton } from '../ActionButton/SnackBar-ActionButton';
import { SnackBarProgressLine } from '../ProgressLine/SnackBar-ProgressLine';
import { cnSnackBar, cnSnackBarItem, Item, snackBarItemStatusDefault } from '../SnackBar';
import { SnackBarTimer, SnackBarTimerPropOnMount } from '../Timer/SnackBar-Timer';

export type SnackBarItemProps = {
  item: Item;
};

type SnackBarItemComponent = (
  props: PropsWithHTMLAttributesAndRef<SnackBarItemProps, HTMLDivElement>,
) => React.ReactElement | null;

const defaultInitialTimerTime = 3;

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
  const { item } = props;
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
      className={cnSnackBarItem({ status, showProgress }, [cnTheme({ color: 'gpnDark' })])}
      onMouseEnter={autoCloseTime ? handleMouseEnter : undefined}
      onMouseLeave={autoCloseTime ? handleMouseLeave : undefined}
    >
      {autoCloseTime && showProgress !== 'line' && (
        <SnackBarTimer
          onMount={handleMountTimer}
          onTimeIsOver={handleTimeIsOver}
          startTime={autoCloseTime}
          hidden={hideAutoCloseTimer}
        />
      )}
      {hideAutoCloseTimer && Icon && <Icon className={cnSnackBar('Icon')} size="m" />}
      <div className={cnSnackBar('Content')}>
        {isString(message) || isNumber(message) ? (
          <Text className={cnSnackBar('Message')} lineHeight="s">
            {message}
          </Text>
        ) : (
          <>{message}</>
        )}
        {actions && <SnackBarActionButton actions={actions} />}
      </div>
      {onClose && (
        <Button
          className={cnSnackBar('CloseButton')}
          view="clear"
          iconLeft={IconClose}
          form="round"
          size="xs"
          onClick={handleClose}
        />
      )}
      {autoCloseTime && showProgress === 'line' && (
        <SnackBarProgressLine
          onMount={handleMountTimer}
          onTimeIsOver={handleTimeIsOver}
          startTime={autoCloseTime}
        />
      )}
    </div>
  );
});
