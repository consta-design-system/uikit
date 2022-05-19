import './DragNDropField.css';

import React, { useRef } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cn } from '../../utils/bem';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { Text } from '../Text/Text';

import { DragNDropFieldContent } from './DragNDropFieldContent/DragNDropFieldContent';
import { DragNDropFieldTooltip } from './DragNDropFieldTooltip/DragNDropFieldTooltip';
import { getErrorsList } from './getErrorsList';
import { DragNDropFieldChildrenRenderProp, DragNDropFieldProps } from './types';

const cnDragNDropField = cn('DragNDropField');

export const COMPONENT_NAME = 'DragNDropField' as const;

export const DragNDropField = React.forwardRef<HTMLDivElement, DragNDropFieldProps>(
  (props, ref) => {
    const dragNDropFieldRef = useRef<HTMLDivElement>(null);

    const {
      accept,
      maxSize,
      multiple = false,
      onDropFiles,
      children = DragNDropFieldContent,
      errorMessages,
    } = usePropsHandler(COMPONENT_NAME, props, dragNDropFieldRef);

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
      accept: accept?.length ? accept : undefined,
      maxSize: maxSize || undefined,
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

    const content = isRenderProp(children)
      ? children({ accept, maxSize, multiple, openFileDialog: open })
      : children;
    const errors = React.useMemo(() => getErrorsList(fileRejections, { maxSize }, errorMessages), [
      fileRejections,
      errorMessages,
    ]);

    return (
      <>
        <div {...rootProps} ref={useForkRef([ref, rootRef, dragNDropFieldRef])}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text view="secondary" size="s" align="center">
              Перетащите файлы сюда
            </Text>
          ) : (
            content
          )}
        </div>
        <DragNDropFieldTooltip anchorRef={rootRef} errors={errors} />
      </>
    );
  },
);

const isRenderProp = (
  children: React.ReactNode | DragNDropFieldChildrenRenderProp,
): children is DragNDropFieldChildrenRenderProp => typeof children === 'function';

export * from './types';
