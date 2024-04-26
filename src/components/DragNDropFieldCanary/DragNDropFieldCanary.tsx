import './DragNDropField.css';

import React, { forwardRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { useForkRef } from '##/hooks/useForkRef/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef/useMutableRef';
import { cnCanary } from '##/utils/bem';

import { withDefaultLocale } from './locale';
import { renderCildren } from './renderCildren';
import { DragNDropFieldProps } from './types';

const cnDragNDropField = cnCanary('DragNDropField');

export const DragNDropField = forwardRef<HTMLDivElement, DragNDropFieldProps>(
  (props, ref) => {
    const {
      accept,
      maxSize,
      minSize,
      multiple = false,
      maxFiles,
      children,
      locale: localeProp,
      disabled,
      onClick,
      onDrop,
      onDropAccepted,
      onDropRejected,
      onError,
      className,
      ...otherProps
    } = props;

    const onClickRef = useMutableRef(onClick);

    const locale = withDefaultLocale(localeProp);

    const {
      getRootProps,
      getInputProps,
      rootRef,
      open: openFileDialog,
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

    return (
      <div
        {...getRootProps({
          ...otherProps,
          className: cnDragNDropField({ active: isDragActive, disabled }, [
            className,
          ]),
          onClick: useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
            if (e.target !== rootRef.current) {
              e.stopPropagation();
            }
            onClickRef.current?.(e);
          }, []),
          ref: useForkRef([ref, rootRef]),
        })}
      >
        <input {...getInputProps()} />
        {renderCildren(children, {
          ...otherStateProps,
          accept,
          maxSize,
          minSize,
          multiple,
          openFileDialog,
          locale,
          disabled,
          isDragActive,
        })}
      </div>
    );
  },
);

export * from './types';
