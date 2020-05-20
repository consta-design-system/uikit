import '../../Theme/_color/Theme_color_gpnDark.css';
import './SnackBar-Item.css';

import React, { useState, useEffect } from 'react';
import { cnTheme } from '../../Theme/Theme';
import { IconClose } from '../../../icons/IconClose/IconClose';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { SnackBarActionButton } from '../ActionButton/SnackBar-ActionButton';
import { SnackBarTimer } from '../Timer/SnackBar-Timer';
import { cnSnackBar, cnSnackBarItem } from '../SnackBar';
import { Item } from '../SnackBar';
import { SnackBarTimerPropOnMount } from '../Timer/SnackBar-Timer';

export type SnackBarItemProps = {
  item: Item;
};

const defaultInitialTimerTime: number = 3000;

export const SnackBarItem: React.FC<SnackBarItemProps> = (props) => {
  const { item } = props;
  const { onClose, autoClose, icon: Icon, message, actions, status = 'normal' } = item;
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
  const autoCloseTime = autoClose
    ? typeof autoClose === 'number'
      ? autoClose
      : defaultInitialTimerTime
    : false;

  useEffect(() => {
    if (!timeIsOver) {
      if (hover) {
        timerFunctions && timerFunctions.pause();
      } else {
        timerFunctions && timerFunctions.start();
      }
    }
  }, [hover]);

  const handleTimeIsOver = () => {
    setTimeIsOver(true);
    onClose && onClose(item);
  };

  const handleClick = onClose ? () => onClose(item) : undefined;

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
        {message && <Text lineHeight="s">{message}</Text>}
        {actions && <SnackBarActionButton actions={actions} />}
      </div>
      {onClose && (
        <Button
          className={cnSnackBar('CloseButton')}
          view="clear"
          iconLeft={IconClose}
          form="round"
          size="xs"
          onClick={handleClick}
        />
      )}
    </div>
  );
};
