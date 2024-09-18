import { IconComponent } from '@consta/icons/Icon';
import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { isString } from '##/utils/type-guards';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { FieldCaption } from '../FieldCaption';
import { FieldLabel } from '../FieldLabel';
import { FieldPropSize, FieldPropStatus } from '../types';
import { cnFieldWrapper } from './cnFieldWrapper';

type FieldWrapperProps = PropsWithHTMLAttributesAndRef<
  {
    children: React.ReactNode;
    size?: FieldPropSize;
    label?: string;
    labelIcon?: IconComponent;
    caption?: string;
    required?: boolean;
    status?: FieldPropStatus;
    side?: React.ReactNode;
    counter?: string | [string, string];
  },
  HTMLDivElement
>;

const renderCounter = (counter: string | [string, string]) => {
  return <Text>{Array.isArray(counter) ? counter.join('/') : counter}</Text>;
};

const renderSide = (side: React.ReactNode) => {
  if (isString(side)) {
    return <Text>side</Text>;
  }
  return side;
};

export const FieldWrapper = forwardRef<HTMLDivElement, FieldWrapperProps>(
  (
    {
      className,
      children,
      label,
      size,
      labelIcon,
      caption,
      required,
      status,
      side,
      counter,
      ...otherProps
    },
    ref,
  ) => {
    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnFieldWrapper(null, [className])}
      >
        {label && (
          <FieldLabel size={size} required={required} icon={labelIcon} />
        )}
        <div className={cnFieldWrapper('ControlWrapper')}>
          <div className={cnFieldWrapper('Control')}>{children}</div>
          {side && (
            <div className={cnFieldWrapper('Side')}>{renderSide(side)}</div>
          )}
        </div>
        <div className={cnFieldWrapper('CaptionWrapper')}>
          {caption && <FieldCaption status={status}>{caption}</FieldCaption>}
          {counter && renderCounter(counter)}
        </div>
      </div>
    );
  },
);
