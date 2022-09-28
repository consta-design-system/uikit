import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';

export const cnHeaderButton = cn('HeaderButton');

type ButtonProps = React.ComponentProps<typeof Button>;

type HeaderButtonProps = Omit<
  ButtonProps,
  'size' | 'view' | 'form' | 'onlyIcon'
>;

export const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
  const { className, ...otherProps } = props;
  return (
    <Button
      {...otherProps}
      className={cnHeaderButton(null, [className])}
      size="m"
      view="clear"
      form="round"
      onlyIcon
    />
  );
};
