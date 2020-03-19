import React, { useState, useMemo } from 'react';
import { useElapsedTime } from 'use-elapsed-time';
import { Id } from '../utils';
import bem from '../../../utils/bem';

import './styles.css';

import Button from '../../Button';
import Timer from '../../Timer';
import IconClose from '../../Icon/icons/Close';

const b = bem('snackbarItem');

type ButtonProps = {
  text: string;
  onClick: (id: Id) => void;
};

export type CommonProps = {
  id: Id;
  view: 'system' | 'success' | 'warning' | 'alert';
  text: string;
  icon?: React.ReactElement;
  button?: ButtonProps;
  timer?: number;
  className?: string;
  onClose: (id: Id) => void;
};

const SnackBarItem: React.FC<CommonProps> = props => {
  const { view, icon, text, button, timer, className, id, onClose } = props;
  const isTimer = useMemo(() => timer || (!timer && !button), [timer, button]);
  const [isPlaying, setIsPlaying] = useState(isTimer ? true : false);
  const isAutoClose = useMemo(() => (timer ? false : isPlaying), [timer, isPlaying]);

  const close = () => {
    onClose(id);
    return undefined;
  };

  const onActionClick = () => {
    if (button) button.onClick(id);
  };

  const onMouseEnter = () => {
    if (!isTimer) return;
    setIsPlaying(false);
  };

  const onMouseLeave = () => {
    if (!isTimer) return;
    setIsPlaying(true);
  };

  useElapsedTime(isAutoClose, { durationMilliseconds: 3000, onComplete: close });

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
          <Timer wpSize="m" timer={timer} onComplete={close} isPlaying={isPlaying} />
        </div>
      )}
      <div className={b('content', {}, 'pt-icon-plus__block')}>
        <div className={b('text')}>{text}</div>
        {button && (
          <div className={b('action')}>
            <Button wpSize="s" form="default" view="ghost" onClick={onActionClick}>
              {button.text}
            </Button>
          </div>
        )}
      </div>
      <Button wpSize="xs" view="clear" iconOnly={true} className={b('close')} onClick={close}>
        <IconClose size="xs" />
      </Button>
    </div>
  );
};

export default SnackBarItem;
