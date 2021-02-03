import './TableFilterPopover.css';

import React from 'react';

import { IconFunnel } from '../../../icons/IconFunnel/IconFunnel';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Popover } from '../../Popover/Popover';

const cnTableFilterPopover = cn('TableFilterPopover');

type Props = {
  isOpened: boolean;
  isActive: boolean;
  onToggle: () => void;
  className?: string;
};

export const TableFilterPopover: React.FC<Props> = ({
  isOpened,
  onToggle,
  className,
  children,
  isActive,
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={buttonRef}
        size="xs"
        iconSize="s"
        view="clear"
        onlyIcon
        onClick={onToggle}
        className={cnTableFilterPopover('Button', { isOpened, isActive }, [className])}
        iconLeft={IconFunnel}
      />
      {isOpened && buttonRef.current && (
        <Popover
          anchorRef={buttonRef}
          possibleDirections={[
            'downRight',
            'downLeft',
            'downCenter',
            'upLeft',
            'upCenter',
            'upRight',
          ]}
          direction="downRight"
          offset={16}
          arrowOffset={12}
          onClickOutside={onToggle}
        >
          {children}
        </Popover>
      )}
    </>
  );
};
