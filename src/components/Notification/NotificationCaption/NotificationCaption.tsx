import './NotificationCaption.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export const cnNotificationCaption = cn('NotificationCaption');

type NotificationCaptionProps = PropsWithHTMLAttributesAndRef<
  {},
  HTMLSpanElement
>;

export const NotificationCaption = forwardRef(
  (
    { className, ...otherProps }: NotificationCaptionProps,
    ref: React.Ref<HTMLSpanElement>,
  ) => {
    return (
      <Text
        {...otherProps}
        ref={ref}
        as="span"
        className={cnNotificationCaption(null, [className])}
        size="2xs"
        lineHeight="m"
        view="ghost"
      />
    );
  },
);
