import './NotificationCaption.css';

import { Text } from '@consta/uikit/Text';
import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

const cnNotificationCaption = cn('NotificationCaption');

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
