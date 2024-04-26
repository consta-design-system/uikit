import React from 'react';

import { isRenderProp } from '##/utils/isRenderProp';

import { DragNDropFieldContent } from './DragNDropFieldContent';
import {
  DragNDropFieldChildrenRenderFn,
  DragNDropFieldContentProps,
} from './types';

export const renderCildren = (
  children: React.ReactNode | DragNDropFieldChildrenRenderFn | undefined,
  props: DragNDropFieldContentProps,
): React.ReactNode => {
  if (!children) {
    return <DragNDropFieldContent {...props} />;
  }
  if (isRenderProp(children)) {
    const {
      openFileDialog,
      isDragAccept,
      isDragActive,
      isDragReject,
      isFileDialogActive,
      isFocused,
      acceptedFiles,
      fileRejections,
    } = props;
    return children({
      openFileDialog,
      isDragAccept,
      isDragActive,
      isDragReject,
      isFileDialogActive,
      isFocused,
      acceptedFiles,
      fileRejections,
    });
  }
  return children;
};
