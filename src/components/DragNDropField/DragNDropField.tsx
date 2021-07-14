import './DragNDropField.css';

import React from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cn } from '../../utils/bem';

import { DragNDropFieldTooltip } from './DragNDropFieldTooltip/DragNDropFieldTooltip';
import { getErrorsList } from './helpers';

type ChildrenRenderProp = (props: { openFileDialog: () => void }) => React.ReactNode;

export type DragNDropFieldProps = {
  accept?: string | string[];
  maxSize?: number;
  multiple?: boolean;
  onDropFiles: (files: File[]) => void;
  children: React.ReactNode | ChildrenRenderProp;
};

const cnDragNDropField = cn('DragNDropField');

export const DragNDropField = React.forwardRef<HTMLDivElement, DragNDropFieldProps>(
  ({ accept, maxSize, multiple = false, onDropFiles, children }, ref) => {
    const handleDrop: DropzoneOptions['onDrop'] = React.useCallback(
      (acceptedFiles) => acceptedFiles.length > 0 && onDropFiles(acceptedFiles),
      [onDropFiles],
    );
    const {
      fileRejections,
      getRootProps,
      getInputProps,
      isDragActive,
      rootRef,
      open,
    } = useDropzone({
      accept,
      maxSize,
      onDrop: handleDrop,
      multiple,
    });

    const handleRootClick: React.MouseEventHandler = React.useCallback((event) => {
      // Чтобы не открывалось окно выбора файла при клике по внутренним элементам
      if (event.target !== rootRef.current) {
        event.stopPropagation();
      }
    }, []);

    const rootProps = getRootProps({
      className: cnDragNDropField('', { active: isDragActive }),
      onClick: handleRootClick,
    });

    const content = isRenderProp(children) ? children({ openFileDialog: open }) : children;
    const errors = React.useMemo(() => getErrorsList(fileRejections), [fileRejections]);

    return (
      <>
        <div {...rootProps} ref={useForkRef([ref, rootRef])}>
          <input {...getInputProps()} />
          {content}
        </div>
        <DragNDropFieldTooltip anchorRef={rootRef} errors={errors} />
      </>
    );
  },
);

const isRenderProp = (
  children: React.ReactNode | ChildrenRenderProp,
): children is ChildrenRenderProp => typeof children === 'function';
