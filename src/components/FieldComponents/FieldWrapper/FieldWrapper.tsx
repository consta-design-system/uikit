import React from 'react';

import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { isString } from '##/utils/type-guards';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { FieldCaption } from '../FieldCaption';
import { FieldLabel } from '../FieldLabel';
import { cnFieldWrapper } from './cnFieldWrapper';
import { directionMap, spaceMap } from './helpers';
import { FieldWrapperProps } from './types';

type Counter = string | number | [string | number, string | number];

const renderCounter = (counter: Counter) => {
  return (
    <Text
      className={cnFieldWrapper('Counter')}
      view="ghost"
      size="xs"
      lineHeight="m"
    >
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
                <FieldCaption
                  className={cnFieldWrapper('Caption')}
                  status={status}
                >
                  {caption}
                </FieldCaption>
              )}
              {counter && renderCounter(counter)}
            </div>
          )}
        </div>
      </Tag>
    );
  },
);
