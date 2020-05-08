import '../../Theme/_color/Theme_color_gpnDark.css';
import './SnackBar-Item.css';

import React, { useMemo, useState, useEffect } from 'react';
import { cnTheme } from '../../Theme/Theme';
import { IconClose } from '../../../icons/IconClose/IconClose';
import { IIcon } from '../../../icons/Icon/Icon';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { SnackBarActionButton } from '../ActionButton/SnackBar-ActionButton';
import { SnackBarTimer } from '../Timer/SnackBar-Timer';
import { cnSnackBar, cnSnackBarItem } from '../SnackBar';
import {
  SnackBarPropGetItemMessage,
  SnackBarPropGetItemAutoClose,
  SnackBarPropItemAction,
  SnackBarPropGetItemStatus,
  SnackBarPropItemStatus,
  SnackBarPropGetItemIcon,
  SnackBarPropGetItemAction,
  SnackBarPropGetItemOnClick,
  SnackBarPropGetItemOnClose,
  SnackBarItemOnClose,
} from '../SnackBar';

export type ISnackBarItem<ITEM> = {
  item: ITEM;
  getMessage?: SnackBarPropGetItemMessage<ITEM>;
  getAutoClose?: SnackBarPropGetItemAutoClose<ITEM>;
  getOnClose?: SnackBarPropGetItemOnClose<ITEM>;
  getAction?: SnackBarPropGetItemAction<ITEM>;
  getOnClick?: SnackBarPropGetItemOnClick<ITEM>;
  getStatus?: SnackBarPropGetItemStatus<ITEM>;
  getIcon?: SnackBarPropGetItemIcon<ITEM>;
};

export function SnackBarItem<ITEM>(props: ISnackBarItem<ITEM>): React.ReactElement {
  const {
    getMessage,
    item,
    getAutoClose,
    getOnClose,
    getAction,
    getOnClick,
    getStatus,
    getIcon,
  } = props;
  const [timerFunctions, setTimerFunctions] = useState<{
    start: () => void;
    pause: () => void;
  } | null>(null);
  const [hover, setHover] = useState<boolean>(false);
  const [timeIsOver, setTimeIsOver] = useState<boolean>(false);

  const message = useMemo<string | number | undefined>(() => getMessage && getMessage(item), [
    getMessage,
    item,
  ]);
  const initialTime = useMemo<number | undefined>(() => {
    const autoClose = getAutoClose && getAutoClose(item);
    if (autoClose) {
      if (Number(autoClose) === autoClose) {
        return autoClose;
      } else {
        return 3;
      }
    }
  }, [getAutoClose, item]);
  const status = useMemo<SnackBarPropItemStatus>(() => (getStatus ? getStatus(item) : 'system'), [
    getStatus,
    item,
  ]);
  const Icon = useMemo<React.FC<IIcon> | undefined>(() => getIcon && getIcon(item), [
    getIcon,
    item,
  ]);
  const action = useMemo<SnackBarPropItemAction<ITEM> | SnackBarPropItemAction<ITEM>[] | undefined>(
    () => getAction && getAction(item),
    [getAction, item]
  );
  const handleClick = useMemo<React.EventHandler<React.MouseEvent> | undefined>(
    () => getOnClick && getOnClick(item),
    [getOnClick, item]
  );
  const handleClose = useMemo<SnackBarItemOnClose | undefined>(
    () => getOnClose && getOnClose(item),
    [getOnClose, item]
  );
  const handleMountTimer = (object) => setTimerFunctions(object);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

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
    handleClose && handleClose();
  };

  return (
    <div
      className={cnSnackBarItem({ status, clickable: Boolean(handleClick) }, [
        cnTheme({ color: 'gpnDark' }),
      ])}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {initialTime && (
        <SnackBarTimer
          onMount={handleMountTimer}
          onTimeIsOver={handleTimeIsOver}
          initialTime={initialTime}
        />
      )}
      {!initialTime && Icon && <Icon className={cnSnackBar('Icon')} size="m" />}
      <div className={cnSnackBar('Content')}>
        {message && <Text lineHeight='s'>{message}</Text>}
        {action && <SnackBarActionButton<ITEM> action={action} />}
      </div>
      {handleClose && (
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
}
