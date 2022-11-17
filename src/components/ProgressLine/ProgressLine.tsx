import './ProgressLine.css';

import React, { forwardRef, useMemo, useRef } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';

import { cn } from '../../utils/bem';
import { isNotNil } from '../../utils/type-guards';
import { Text } from '../Text/Text';
import {
  calculateLinePositions,
  generateMask,
  getProgress,
  withDefaultGetters,
} from './helpers';
import { ProgressLineComponent, ProgressLineProps } from './types';

const cnProgressLine = cn('ProgressLine');

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

  const containerRef = useRef<HTMLDivElement>(null);

  const { width: containerWidth } = useComponentSize(containerRef);

  const lines = useMemo(
    () => calculateLinePositions(steps?.length ?? 0, containerWidth),
    [containerWidth, steps],
  );

  const { mode, activeIndex } = useMemo(() => {
    const data = {
      mode: isNotNil(value) ? 'determinate' : 'indeterminate',
      activeIndex: isNotNil(value) ? Math.min(value, steps?.length ?? 0) : -1,
    };
    if (steps) {
      data.mode = 'step';
      if ((value ?? 0) >= steps.length) {
        data.activeIndex = steps.length - 1;
      }
    }
    return data;
  }, [steps, value]);

  const containerProps = {
    ...otherProps,
    ref: useForkRef([ref, containerRef]),
    className: cnProgressLine({
      size,
      mode,
    }),
    style: {
      ...style,
      ['--progress-line-value' as string]: `${getProgress(value ?? 0)}`,
      ['--progress-line-steps' as string]: steps?.length,
      ['--progress-line-background-active-width' as string]: `${
        lines?.[activeIndex]
          ? lines[activeIndex].x + lines[activeIndex].width
          : 0
      }px`,
      ['--progress-line-background-steps' as string]: lines.length
        ? generateMask(lines)
        : '',
    },
  };

  return (
    <div {...containerProps}>
      {steps && (
        <div className={cnProgressLine('Steps')}>
          {steps?.map((item, index) => {
            const label = getItemLabel(item);
            return (
              <div
                key={cnProgressLine('Step', { index })}
                className={cnProgressLine('Step')}
              >
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
      )}
    </div>
  );
};

export const ProgressLine = forwardRef(
  ProgressLineRender,
) as ProgressLineComponent;
