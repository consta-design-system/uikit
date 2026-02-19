import { IconFileUnknown } from '@consta/icons/IconFileUnknown';
import React, { forwardRef } from 'react';

import { FileBase } from './FileCanaryBase/FileCanaryBase';
import {
  FileComponent,
  FileConfig,
  FileProps,
  filePropSizeDefault,
  FileTypeConfig,
} from './types';

const UNKNOWN_EXTENSION_CONFIG: FileTypeConfig = {
  color: 'var(--file-color-unknown)',
  icon: IconFileUnknown,
};

export function fileGenerator(config: FileConfig) {
  const FileRender = (
    {
      size = filePropSizeDefault,
      extension,
      className,
      as: Tag = 'div',
      ...otherProps
    }: FileProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const fileConfig = config[extension] ?? UNKNOWN_EXTENSION_CONFIG;

    return (
      <FileBase
        size={size}
        icon={fileConfig.icon}
        extension={extension}
        color={fileConfig.color}
        className={className}
        ref={ref}
        as={Tag}
        {...otherProps}
      />
    );
  };
  return forwardRef(FileRender) as FileComponent;
}
