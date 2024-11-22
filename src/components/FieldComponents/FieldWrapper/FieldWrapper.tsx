import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { Text } from '##/components/Text';
import { cnMixFlex, MixFlexPropDirection } from '##/mixs/MixFlex';
import { Space } from '##/mixs/MixSpace';
import { isString } from '##/utils/type-guards';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { FieldCaption } from '../FieldCaption';
import { FieldLabel } from '../FieldLabel';
import { FieldPropSize, FieldPropStatus } from '../types';
import { cnFieldWrapper } from './cnFieldWrapper';

type Counter = string | number | [string | number, string | number];

type FieldWrapperProps = {
  children: React.ReactNode;
  size?: FieldPropSize;
  label?: string;
  labelIcon?: IconComponent;
  labelIconRef?: React.Ref<HTMLSpanElement>;
  labelPosition?: 'top' | 'left';
  labelHtmlFor?: string;
  caption?: string;
  required?: boolean;
  status?: FieldPropStatus;
  side?: React.ReactNode;
  counter?: Counter;
};

const renderCounter = (counter: Counter) => {
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

const spaceMap: Record<FieldPropSize, Space> = {
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

export const FieldWrapper = forwardRefWithAs<FieldWrapperProps>(
  (props, ref) => {
    const {
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
      labelIconRef,
      as = 'div',
      labelHtmlFor,
      ...otherProps
    } = props;

    const Tag = as as string;
    const gap = spaceMap[size];

    return (
      <Tag
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
          <FieldLabel
            size={size}
            required={required}
            icon={labelIcon}
            iconRef={labelIconRef}
            {...(labelHtmlFor
              ? {
                  htmlFor: labelHtmlFor,
                  as: 'label',
                }
              : {})}
          >
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
      </Tag>
    );
  },
);
