import React, { useState, useMemo } from 'react';
import { useElapsedTime } from 'use-elapsed-time';
import bem from '../../../utils/bem';

import './styles.css';

import Button from '../../Button';
import Timer from '../../Timer';
import IconClose from '../../Icon/icons/Close';
import { useSnackbar } from '../index';

const b = bem('snackbarItem');

export type CommonProps = {
  id: string;
  view: 'system' | 'success' | 'warning' | 'alert';
  text: string;
  icon?: React.ReactElement;
  button?: (onClose: () => undefined) => React.ReactElement;
  timer?: number;
  className?: string;
};

const SnackBarItem: React.FC<CommonProps> = props => {
  const { view, icon, text, button, timer, className, id } = props;
  const isTimer = useMemo(() => timer || (!timer && !button), [timer, button]);
  const [isPlaying, setIsPlaying] = useState(isTimer ? true : false);
  const isAutoClose = useMemo(() => (timer ? false : isPlaying), [timer, isPlaying]);
  const { remove } = useSnackbar();

  const onClose = () => {
    remove(id);
    return undefined;
  };

  const onMouseEnter = () => {
    if (!isTimer) return;
    setIsPlaying(false);
  };

  const onMouseLeave = () => {
    if (!isTimer) return;
    setIsPlaying(true);
  };

  useElapsedTime(isAutoClose, { durationMilliseconds: 3000, onComplete: onClose });

  return (
    <div
      className={b({ view }, ['theme_color_gpn-dark pt-icon-plus', className])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!timer && icon && (
        <div className={b('icon', {}, 'pt-icon-plus__icon pt-icon-plus__icon_indent-r_m')}>
          {icon}
        </div>
      )}
      {timer && (
        <div className={b('icon', {}, 'pt-icon-plus__icon pt-icon-plus__icon_indent-r_m')}>
          <Timer timer={timer} onComplete={onClose} isPlaying={isPlaying} />
        </div>
      )}
      <div className="pt-icon-plus__block">
        <div className={b('text')}>{text}</div>
        {button && <div className={b('action')}>{button(onClose)}</div>}
      </div>
      <Button wpSize="xs" view="clear" iconOnly={true} className={b('close')} onClick={onClose}>
        <IconClose size={'xs'} />
      </Button>
    </div>
  );
};

export default SnackBarItem;
