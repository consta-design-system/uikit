import './DragNDropField.css';

import React, { forwardRef, useRef } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { useMutableRef } from '../../hooks/useMutableRef/useMutableRef';
import { cn } from '../../utils/bem';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { Text } from '../Text/Text';
import { DragNDropFieldContent } from './DragNDropFieldContent/DragNDropFieldContent';
import { DragNDropFieldTooltip } from './DragNDropFieldTooltip/DragNDropFieldTooltip';
import { getErrorsList } from './getErrorsList';
import { withdefaultLocale } from './locale';
import { DragNDropFieldChildrenRenderProp, DragNDropFieldProps } from './types';

const cnDragNDropField = cn('DragNDropField');

export const COMPONENT_NAME = 'DragNDropField' as const;

export const DragNDropField = forwardRef<HTMLDivElement, DragNDropFieldProps>(
  (props, ref) => {
    const dragNDropFieldRef = useRef<HTMLDivElement>(null);

    const {
      accept,
      maxSize,
      minSize,
      multiple = false,
      onDropFiles,
      children = DragNDropFieldContent,
      locale: localeProp,
      disabled,
      onClick,
      ...otherProps
    } = usePropsHandler(COMPONENT_NAME, props, dragNDropFieldRef);

    const onClickRef = useMutableRef(onClick);

    const locale = withdefaultLocale(localeProp);

    const handleDrop: DropzoneOptions['onDrop'] = React.useCallback(
      (acceptedFiles: File[]) =>
        acceptedFiles.length > 0 && onDropFiles(acceptedFiles),
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
      minSize: minSize || undefined,
      onDrop: handleDrop,
      multiple,
      disabled,
    });

    const handleRootClick: React.MouseEventHandler<HTMLDivElement> =
      React.useCallback((e) => {
        // Чтобы не открывалось окно выбора файла при клике по внутренним элементам
        if (e.target !== rootRef.current) {
          e.stopPropagation();
        }
        onClickRef.current?.(e);
      }, []);

    const rootProps = getRootProps({
      ...otherProps,
      className: cnDragNDropField({ active: isDragActive, disabled }, [
        otherProps.className,
      ]),
      onClick: handleRootClick,
    });

    const content = isRenderProp(children)
      ? children({
          accept,
          maxSize,
          minSize,
          multiple,
          openFileDialog: open,
          locale,
          disabled,
        })
      : children;

    const errors = React.useMemo(
      () => getErrorsList(fileRejections, { maxSize, minSize }, locale),
      [fileRejections],
    );

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
): children is DragNDropFieldChildrenRenderProp =>
  typeof children === 'function';

export * from './types';
