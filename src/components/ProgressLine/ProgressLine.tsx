import './ProgressLine.css';

import React, { forwardRef, useMemo } from 'react';

import { usePrevious } from '../../hooks/usePrevious/usePrevious';
import { cn } from '../../utils/bem';
import { isNotNil, isNumber } from '../../utils/type-guards';
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

function ProgressLineRender<ITEM>(props: ProgressLineProps<ITEM>, ref: React.Ref<HTMLDivElement>) {
  const {
    size = 'm',
    value,
    style,
    steps: stepsProp,
    getItemLabel,
    ...otherProps
  } = withDefaultGetters(props);

  const steps = useMemo(() => {
    if (typeof stepsProp === 'number') {
      return Array.from(Array(stepsProp).keys()) as ITEM[];
    }
    return stepsProp ?? [];
  }, [stepsProp]);

  const activeIndex =
    typeof value === 'number'
      ? Math.min(value, typeof stepsProp === 'number' ? stepsProp : stepsProp?.length ?? 0)
      : -1;

  const prevValue = usePrevious(activeIndex);

  type Item = Parameters<typeof getItemLabel>[0];

  return !stepsProp ? (
    <div
      {...otherProps}
      ref={ref}
      style={{
        ...style,
        ['--progress-line-value' as string]: `${getProgress(value ?? 0)}`,
      }}
      className={cnProgressLine({
        size,
        mode: isNumber(value) ? 'determinate' : 'indeterminate',
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
          <div key={`PrgressLine-Step-${index}`} className={cnProgressLine('Step')}>
            <div
              style={{
                ['--progress-line-delay' as string]: `${Math.max(0, delay) * 0.3}s`,
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
}

export const ProgressLine = forwardRef(ProgressLineRender) as ProgressLineComponent;
