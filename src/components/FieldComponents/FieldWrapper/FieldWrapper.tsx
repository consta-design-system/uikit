import { IconComponent } from '@consta/icons/Icon';
import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { cnMixFlex, MixFlexPropDirection } from '##/mixs/MixFlex';
import { Space } from '##/mixs/MixSpace';
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
    counter?: string | number | [string | number, string | number];
    labelPosition?: 'top' | 'left';
  },
  HTMLDivElement
>;

const renderCounter = (
  counter: Exclude<FieldWrapperProps['counter'], undefined>,
) => {
  return (
    <Text view="ghost" size="xs" lineHeight="m">
      {Array.isArray(counter) ? counter.join('/') : counter}
    </Text>
  );
};

const renderSide = (side: React.ReactNode) => {
  if (isString(side)) {
    return <span className={cnFieldWrapper('SideText')}>{side}</span>;
  }
  return side;
};

const spaseMap: Record<FieldPropSize, Space> = {
  l: 'xs',
  m: 'xs',
  s: '2xl',
  xs: '2xs',
};

const directionMap: Record<
  Exclude<FieldWrapperProps['labelPosition'], undefined>,
  MixFlexPropDirection
> = {
  top: 'column',
  left: 'row',
};

export const FieldWrapper = forwardRef<HTMLDivElement, FieldWrapperProps>(
  (
    {
      className,
      children,
      label,
      size = 'm',
      labelIcon,
      caption,
      required,
      status,
      side,
      counter,
      labelPosition = 'top',
      ...otherProps
    },
    ref,
  ) => {
    const gap = spaseMap[size];

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnFieldWrapper(null, [
          cnMixFlex({
            direction: directionMap[labelPosition],
            gap: labelPosition === 'top' ? gap : 's',
          }),
          className,
        ])}
      >
        {label && (
          <FieldLabel size={size} required={required} icon={labelIcon}>
            {label}
          </FieldLabel>
        )}
        <div
          className={cnFieldWrapper('ControlAndCaptionWrapper', [
            cnMixFlex({ gap, direction: 'column' }),
          ])}
        >
          <div
            className={cnFieldWrapper('ControlWrapper', [
              cnMixFlex({ gap, direction: 'row' }),
            ])}
          >
            <div className={cnFieldWrapper('Control')}>{children}</div>
            {side && (
              <div
                className={cnFieldWrapper('Side', [
                  cnMixFlex({ align: 'center', justify: 'center' }),
                ])}
                style={{
                  ['--field-wrapper-side-text-size' as string]: `var(--control-text-size-${size})`,
                  ['--field-wrapper-side-height' as string]: `var(--control-height-${size})`,
                }}
              >
                {renderSide(side)}
              </div>
            )}
          </div>
          {(caption || counter) && (
            <div
              className={cnMixFlex({
                direction: 'row',
                gap,
                justify: 'space-between',
              })}
            >
              {caption && (
                <FieldCaption status={status}>{caption}</FieldCaption>
              )}
              {counter && renderCounter(counter)}
            </div>
          )}
        </div>
      </div>
    );
  },
);
