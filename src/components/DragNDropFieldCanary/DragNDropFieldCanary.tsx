import './DragNDropField.css';

import React, { forwardRef, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

import { usePropsHandler } from '##/components/EventInterceptor/usePropsHandler';
import { useForkRef } from '##/hooks/useForkRef/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef/useMutableRef';
import { cnCanary } from '##/utils/bem';
import { isRenderProp } from '##/utils/isRenderProp';

import { DragNDropFieldContent } from './DragNDropFieldContent/DragNDropFieldContent';
import { withDefaultLocale } from './locale';
import { DragNDropFieldProps } from './types';

const cnDragNDropField = cnCanary('DragNDropField');

export const COMPONENT_NAME = 'DragNDropField' as const;

export const DragNDropField = forwardRef<HTMLDivElement, DragNDropFieldProps>(
  (props, ref) => {
    const dragNDropFieldRef = useRef<HTMLDivElement>(null);

    const {
      accept,
      maxSize,
      minSize,
      multiple = false,
      maxFiles,
      children = DragNDropFieldContent,
      locale: localeProp,
      disabled,
      onClick,
      onDrop,
      onDropAccepted,
      onDropRejected,
      onError,
      ...otherProps
    } = usePropsHandler(COMPONENT_NAME, props, dragNDropFieldRef);

    const onClickRef = useMutableRef(onClick);

    const locale = withDefaultLocale(localeProp);

    const {
      getRootProps,
      getInputProps,
      rootRef,
      open,
      isDragActive,
      ...otherStateProps
    } = useDropzone({
      accept,
      maxSize: maxSize || undefined,
      minSize: minSize || undefined,
      maxFiles: maxFiles || undefined,
      multiple,
      disabled,
      onDrop,
      onDropAccepted,
      onDropRejected,
      onError,
    });

    const handleRootClick: React.MouseEventHandler<HTMLDivElement> =
      React.useCallback((e) => {
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
          // maxFiles
          multiple,
          openFileDialog: open,
          locale,
          disabled,
          isDragActive,
          ...otherStateProps,
        })
      : children;

    return (
      <div {...rootProps} ref={useForkRef([ref, rootRef, dragNDropFieldRef])}>
        <input {...getInputProps()} />
        {content}
      </div>
    );
  },
);

export * from './types';
