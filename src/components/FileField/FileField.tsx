import './FileField.css';

import React, { useEffect, useRef } from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

type ComponentProps = {
  onClick: React.MouseEventHandler<HTMLElement>;
};

type Props = {
  children: React.ComponentType<ComponentProps>;
  onChange: (object: { e: React.ChangeEvent; value: FileList | null }) => void;
  value: FileList | null;
  multiple?: boolean;
  type?: never;
  tabIndex?: never;
  className?: never;
};

export type FileFieldProps = PropsWithHTMLAttributes<Props, HTMLInputElement>;

export const cnFileField = cn('FileField');
const cnFileFieldInput = cnFileField('Input');

export const FileField: React.FC<FileFieldProps> = (props) => {
  const { children: Component, value, onChange, ...otherProps } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    onChange({ e, value: files?.length && files?.length > 0 ? files : null });
  };

  useEffect(() => {
    if (inputRef.current) {
      if (value) {
        inputRef.current.files = value;
      } else if (window.DataTransfer) {
        const dataTransfer = new window.DataTransfer();
        inputRef.current.files = dataTransfer.files;
      } else {
        inputRef.current.value = '';
      }
    }
  }, [value]);

  return (
    <>
      <input
        {...otherProps}
        className={cnFileFieldInput}
        ref={inputRef}
        type="file"
        onChange={handleChange}
        tabIndex={-1}
      />
      <Component onClick={handleClick} />
    </>
  );
};
