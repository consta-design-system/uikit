import './FieldGroup.css';

import React, { cloneElement, forwardRef } from 'react';

import { cn } from '../../utils/bem';
import { isNotNil } from '../../utils/type-guards';
import { getForm } from './getForm';
import {
  FieldGroupPropChildren,
  FieldGroupPropForm,
  FieldGroupProps,
  FieldGroupPropSize,
} from './types';

const cnFieldGroup = cn('FieldGroup');

const renderChildren = (
  children?: FieldGroupPropChildren,
  form?: FieldGroupPropForm,
  size?: FieldGroupPropSize,
) => {
  if (Array.isArray(children) && children.length) {
    return children.map((el, index) => {
      if (isNotNil(el)) {
        return cloneElement(el, {
          ...el.props,
          form: getForm(form, index, children.length),
          size,
          key: el.key || index,
        });
      }
      return null;
    });
  }
  return null;
};

export const FieldGroup = forwardRef(
  (props: FieldGroupProps, ref: React.Ref<HTMLDivElement>) => {
    const { children, className, size, form, ...otherProps } = props;

    return (
      <div
        {...otherProps}
        className={cnFieldGroup(null, [className])}
        ref={ref}
      >
        {renderChildren(children, form, size)}
      </div>
    );
  },
);

export * from './types';
export * from './getForm';
