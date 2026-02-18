import { IconComponent } from '@consta/icons/Icon';

export const filePropSize = ['s', 'm'] as const;
export type FilePropSize = typeof filePropSize[number];
export const filePropSizeDefault: FilePropSize = filePropSize[1];

export type FileTypeConfig = {
  color: string;
  icon: IconComponent;
};

export type FileConfig = Record<string, FileTypeConfig>;

export type FileBaseProps = {
  size: FilePropSize;
  icon: IconComponent;
  extension: string;
  color: string;
  className?: string;
};

export type FileProps = {
  size?: FilePropSize;
  extension: string;
  className?: string;
};
