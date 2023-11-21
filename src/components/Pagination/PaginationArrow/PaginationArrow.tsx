import './PaginationArrow.css';

import React, { forwardRef } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';

import {
  PaginationArrowProps,
  paginationPropFormDefault,
  paginationPropSizeDefault,
} from '../types';

const cnPaginationArrow = cn('PaginationArrow');

export const PaginationArrow = forwardRef<
  HTMLButtonElement,
  PaginationArrowProps
>((props, ref) => {
  const {
    size = paginationPropSizeDefault,
    form = paginationPropFormDefault,
    label,
    caption,
    icon,
    orientation,
    disabled,
    className,
    children,
    ...otherProps
  } = props;

  if (label) {
    return (
      <div
        className={cnPaginationArrow('Wrapper', [
          cnMixFlex({
            flex: 'inline-flex',
            align: orientation === 'start' ? 'flex-end' : 'flex-start',
            direction: 'column',
          }),
        ])}
      >
        <Button
          size={size}
          form={form}
          className={cnPaginationArrow(null, [className])}
          ref={ref}
          view="clear"
          disabled={disabled}
          label={label}
          iconLeft={orientation === 'start' ? icon : undefined}
          iconRight={orientation === 'end' ? icon : undefined}
          {...otherProps}
        />
        {caption && (
          <Text
            view="ghost"
            size="xs"
            lineHeight="m"
            className={cnPaginationArrow('Caption', { size, orientation })}
          >
            {caption}
          </Text>
        )}
      </div>
    );
  }

  return (
    <Button
      size={size}
      form={form}
      disabled={disabled}
      onlyIcon
      view="clear"
      iconLeft={icon}
      className={cnPaginationArrow(null, [className])}
      ref={ref}
      {...otherProps}
    />
  );
});
