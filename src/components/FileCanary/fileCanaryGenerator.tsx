import { IconFileUnknown } from '@consta/icons/IconFileUnknown';
import React from 'react';

import { FileBase } from './FileCanaryBase/FileCanaryBase';
import {
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
  const File: React.FC<FileProps> = (props) => {
    const {
      size = filePropSizeDefault,
      extension,
      className,
      ...otherProps
    } = props;

    const fileConfig = config[extension] ?? UNKNOWN_EXTENSION_CONFIG;

    return (
      <FileBase
        size={size}
        icon={fileConfig.icon}
        extension={extension}
        color={fileConfig.color}
        className={className}
        {...otherProps}
      />
    );
  };
  return File;
}
