import { IconComponent } from '@consta/icons/Icon';

export const attachmentPropSize = ['s', 'xs', 'm'] as const;
export type AttachmentPropSize = typeof attachmentPropSize[number];
export const attachmentPropSizeDefault: AttachmentPropSize =
  attachmentPropSize[0];

export type AttachmentProps = {
  fileExtension?: string;
  loading?: boolean;
  fileName?: string;
  fileDescription?: string;
  loadingProgress?: number;
  errorText?: string;
  size?: AttachmentPropSize;
  loadingText?: string;
  onButtonClick?: React.EventHandler<React.MouseEvent>;
  buttonIcon?: IconComponent;
  buttonTitle?: string;
  withAction?: boolean;
  className?: string;
  children?: never;
};
