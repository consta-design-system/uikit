import './FileField.css';

import React, { useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cnMixVisuallyHidden } from '../../mixs/MixVisuallyHidden/MixVisuallyHidden';
import { cn } from '../../utils/bem';
import { PropsWithJsxAttributes } from '../../utils/types/PropsWithJsxAttributes';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

type ComponentProps = { role: string; as: keyof JSX.IntrinsicElements };

type RenderFn = (props: ComponentProps) => React.ReactNode;

export type FileFieldProps = PropsWithJsxAttributes<
  {
    id: string;
    onChange?: (e: DragEvent | React.ChangeEvent) => void;
    children?: RenderFn | React.ReactNode;
    inputRef?: React.Ref<HTMLInputElement>;
  },
  'input'
>;

export const COMPONENT_NAME = 'FileField' as const;

function isRenderFn(fn: RenderFn | React.ReactNode): fn is RenderFn {
  return (fn as RenderFn).call !== undefined;
}

export const cnFileField = cn('FileField');

export const FileField: React.FC<FileFieldProps> = (props) => {
  const fileFieldRef = useRef<HTMLInputElement>(null);

  const {
    className,
    children,
    id,
    inputRef,
    'aria-label': ariaLabel = 'File input',
    ...inputProps
  } = usePropsHandler(COMPONENT_NAME, props, fileFieldRef);

  const content = isRenderFn(children)
    ? children({ role: 'button', as: 'span' })
    : children;

  return (
    <label htmlFor={id} className={cnFileField(null, [className])}>
      <input
        {...inputProps}
        className={cnFileField('Input', [cnMixVisuallyHidden()])}
        id={id}
        type="file"
        aria-label={ariaLabel}
        ref={useForkRef([inputRef, fileFieldRef])}
      />
      {content}
    </label>
  );
};
