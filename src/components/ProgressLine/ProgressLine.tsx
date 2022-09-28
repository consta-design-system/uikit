import './ProgressLine.css';

import React, { forwardRef } from 'react';

import { usePrevious } from '../../hooks/usePrevious/usePrevious';
import { cn } from '../../utils/bem';
import { isNotNil } from '../../utils/type-guards';
import { Text } from '../Text/Text';
import { getLineDelay, withDefaultGetters } from './helpers';
import { ProgressLineComponent, ProgressLineProps } from './types';

const cnProgressLine = cn('ProgressLine');

const getProgress = (progress: number) => {
  const progressNormal = Math.ceil(progress);

  if (progressNormal >= 100) {
    return 1;
  }

  if (progressNormal <= 0) {
    return 0;
  }

  return progressNormal / 100;
};

const ProgressLineRender = (
  props: ProgressLineProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    size = 'm',
    value,
    style,
    steps,
    getItemLabel,
    ...otherProps
  } = withDefaultGetters(props);

  const activeIndex = isNotNil(value)
    ? Math.min(value, steps?.length ?? 0)
    : -1;

  const prevValue = usePrevious(activeIndex);

  return !steps ? (
    <div
      {...otherProps}
      ref={ref}
      style={{
        ...style,
        ['--progress-line-value' as string]: `${getProgress(value ?? 0)}`,
      }}
      className={cnProgressLine({
        size,
        mode: isNotNil(value) ? 'determinate' : 'indeterminate',
      })}
    />
  ) : (
    <div
      {...otherProps}
      style={{
        ...style,
        ['--progress-line-steps' as string]: steps.length,
      }}
      ref={ref}
      className={cnProgressLine({
        size,
        mode: 'step',
      })}
    >
      {steps.map((item, index) => {
        const label = getItemLabel(item);
        const active = activeIndex >= index;
        const delay = getLineDelay(activeIndex, prevValue ?? -1, index);
        return (
          <div
            key={cnProgressLine('Step', { index })}
            className={cnProgressLine('Step')}
          >
            <div
              style={{
                ['--progress-line-delay' as string]: `${
                  Math.max(0, delay) * 0.3
                }s`,
              }}
              className={cnProgressLine('Line', {
                active,
              })}
            />
            {isNotNil(label) && (
              <Text
                className={cnProgressLine('Label')}
                size="2xs"
                lineHeight="xs"
                view="secondary"
                align="center"
              >
                {label}
              </Text>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ProgressLine = forwardRef(
  ProgressLineRender,
) as ProgressLineComponent;
