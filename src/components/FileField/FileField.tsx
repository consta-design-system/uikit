import './FileField.css';

import React from 'react';

import { cnMixVisuallyHidden } from '../../mixs/MixVisuallyHidden/MixVisuallyHidden';
import { cn } from '../../utils/bem';
import { PropsWithJsxAttributes } from '../../utils/types/PropsWithJsxAttributes';

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

function isRenderFn(fn: RenderFn | React.ReactNode): fn is RenderFn {
  return (fn as RenderFn).call !== undefined;
}

export const cnFileField = cn('FileField');

export const FileField: React.FC<FileFieldProps> = (props) => {
  const {
    className,
    children,
    id,
    inputRef,
    'aria-label': ariaLabel = 'File input',
    ...inputProps
  } = props;

  const content = isRenderFn(children) ? children({ role: 'button', as: 'span' }) : children;

  return (
    <label htmlFor={id} className={cnFileField(null, [className])}>
      <input
        {...inputProps}
        className={cnFileField('Input', [cnMixVisuallyHidden()])}
        id={id}
        type="file"
        aria-label={ariaLabel}
        ref={inputRef}
      />
      {content}
    </label>
  );
};
