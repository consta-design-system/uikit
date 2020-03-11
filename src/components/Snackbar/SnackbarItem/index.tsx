import React, { useState } from 'react';
import bem from '../../../utils/bem';

import './styles.css';

import Button from '../../Button';
import Timer from '../../Timer';
import IconClose from '../../Icon/icons/Close';

const b = bem('snackBarItem');

type CommonProps = {
  view: 'system' | 'success' | 'warning' | 'alert';
  text: string;
  icon?: React.ReactElement;
  button?: React.ReactElement;
  timer?: number;
};

const SnackBarItem: React.FC<CommonProps> = props => {
  const { view, icon, text, button, timer } = props;
  const [isPlaying, setIsPlaying] = useState(true);

  const onClose = () => {
    console.log('close');

    return undefined;
  };

  const onMouseEnter = () => {
    if (!timer) return;
    setIsPlaying(false);
  };

  const onMouseLeave = () => {
    if (!timer) return;
    setIsPlaying(true);
  };

  return (
    <div className={b({ view })} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {!timer && icon && <div className={b('icon')}>{icon}</div>}
      {timer && (
        <div className={b('icon')}>
          <Timer timer={timer} onComplete={onClose} isPlaying={isPlaying} />
        </div>
      )}
      <div className={b('content')}>
        <div className={b('text')}>{text}</div>
        {button && <div className={b('action')}>{button}</div>}
      </div>
      <Button wpSize="xs" view="clear" iconOnly={true} className={b('close')} onClick={onClose}>
        <IconClose size={'xs'} />
      </Button>
    </div>
  );
};

export default SnackBarItem;
