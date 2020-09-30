import '../../Theme/_color/Theme_color_gpnDark.css';
import './SnackBar-Item.css';

import React, { useEffect, useState } from 'react';

import { IconClose } from '../../../icons/IconClose/IconClose';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { cnTheme } from '../../Theme/Theme';
import { SnackBarActionButton } from '../ActionButton/SnackBar-ActionButton';
import { cnSnackBar, cnSnackBarItem, Item, snackBarItemStatusDefault } from '../SnackBar';
import { SnackBarTimer, SnackBarTimerPropOnMount } from '../Timer/SnackBar-Timer';

export type SnackBarItemProps = {
  item: Item;
};

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

export const SnackBarItem: React.FC<SnackBarItemProps> = (props) => {
  const { item } = props;
  const {
    onClose,
    autoClose,
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
  const [hover, setHover] = useState<boolean>(false);
  const [timeIsOver, setTimeIsOver] = useState<boolean>(false);
  const handleMountTimer: SnackBarTimerPropOnMount = (timerFunctions) =>
    setTimerFunctions(timerFunctions);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  const autoCloseTime = getAutoCloseTime(autoClose);
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
    setTimeIsOver(true);
    onAutoClose(item);
  };

  const handleClose = onClose ? () => onClose(item) : undefined;

  return (
    <div
      className={cnSnackBarItem({ status }, [cnTheme({ color: 'gpnDark' })])}
      onMouseEnter={autoCloseTime ? handleMouseEnter : undefined}
      onMouseLeave={autoCloseTime ? handleMouseLeave : undefined}
    >
      {autoCloseTime && (
        <SnackBarTimer
          onMount={handleMountTimer}
          onTimeIsOver={handleTimeIsOver}
          startTime={autoCloseTime}
        />
      )}
      {!autoCloseTime && Icon && <Icon className={cnSnackBar('Icon')} size="m" />}
      <div className={cnSnackBar('Content')}>
        {message && (
          <Text className={cnSnackBar('Message')} lineHeight="s">
            {message}
          </Text>
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
    </div>
  );
};
