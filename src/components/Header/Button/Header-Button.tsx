import React from 'react';

import { Button } from '../../Button/Button';

type ButtonProps = React.ComponentProps<typeof Button>;

type HeaderButtonProps = Omit<ButtonProps, 'size' | 'view' | 'form' | 'onlyIcon'>;

export const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
  return <Button {...props} size="m" view="clear" form="round" onlyIcon />;
};
