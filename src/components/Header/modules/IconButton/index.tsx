import React, { FocusEventHandler } from 'react';

import { Button, PropOnClick } from '../../../Button/Button';

type Props = {
  // icon: string;
  onClick?: PropOnClick;
  onBlur?: FocusEventHandler<HTMLElement>;
  tabIndex?: number;
  className?: string;
};

const IconButton: React.FC<Props> = ({ onClick, onBlur, tabIndex, className, ...restProps }) => {
  return (
    <Button
      type="button"
      size="m"
      view="clear"
      form="round"
      onClick={onClick}
      onBlur={onBlur}
      tabIndex={tabIndex}
      className={className}
      {...restProps}
    />
  );
};

export { IconButton };
