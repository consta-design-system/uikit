import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

export const attachmentPropSize = ['s', 'xs', 'm'] as const;
export type AttachmentPropSize = typeof attachmentPropSize[number];
export const attachmentPropSizeDefault: AttachmentPropSize =
  attachmentPropSize[0];

export type AttachmentActions = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: IconComponent;
  title?: string;
  ref?: React.Ref<HTMLButtonElement>;
};

export type AttachmentProps = {
  fileExtension?: string;
  withPictogram?: boolean;
  loading?: boolean;
  fileName?: string;
  fileDescription?: string;
  loadingProgress?: number;
  errorText?: string;
  size?: AttachmentPropSize;
  loadingText?: string;
  className?: string;
  children?: never;
  actions?: AttachmentActions[];
  /**
   * @deprecated use actions or onClick
   */
  withAction?: boolean;
  /**
   * @deprecated use actions
   */
  onButtonClick?: React.EventHandler<React.MouseEvent>;
  /**
   * @deprecated use actions
   */
  buttonIcon?: IconComponent;
  /**
   * @deprecated use actions
   */
  buttonTitle?: string;
};
