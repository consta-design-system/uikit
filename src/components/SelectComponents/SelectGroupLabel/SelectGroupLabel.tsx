import './SelectGroupLabel.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { PropSize } from '../types';

type SelectGroupLabelProps = PropsWithHTMLAttributes<
  {
    label?: string;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const cnSelectGroupLabel = cn('SelectGroupLabel');

export const SelectGroupLabel: React.FC<SelectGroupLabelProps> = (props) => {
  const { className, label, size, indent, ...otherProps } = props;

  return (
    <div {...otherProps} className={cnSelectGroupLabel({ size, indent }, [className])}>
      {label}
    </div>
  );
};
