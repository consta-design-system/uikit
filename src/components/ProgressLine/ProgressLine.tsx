import './ProgressLine.css';

import React, { forwardRef, useMemo, useRef } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';

import { cn } from '../../utils/bem';
import { isNotNil } from '../../utils/type-guards';
import { Text } from '../Text/Text';
import {
  calculateLinePositions,
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
    },
  };

  const { width: containerWidth } = useComponentSize(containerRef);

  const lines = useMemo(
    () => calculateLinePositions(steps?.length ?? 0, containerWidth),
    [containerWidth, steps],
  );

  return (
    <div {...containerProps}>
      {steps && (
        <>
          <svg
            className={cnProgressLine('Line')}
            width={containerWidth}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="Mask">
                <rect
                  x="0"
                  y="0"
                  width={
                    lines[activeIndex]
                      ? lines[activeIndex].x + lines[activeIndex].width
                      : 0
                  }
                />
              </mask>
            </defs>
            <g>
              {lines.map(({ x, y, width }, index) => (
                <rect
                  key={cnProgressLine('Line', { index })}
                  x={x}
                  y={y}
                  width={width}
                />
              ))}
            </g>
            <g mask="url(#Mask)">
              {lines.map(({ x, y, width }, index) => (
                <rect
                  key={cnProgressLine('Line', { index, active: true })}
                  x={x}
                  y={y}
                  width={width}
                />
              ))}
            </g>
          </svg>
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
        </>
      )}
    </div>
  );
};

export const ProgressLine = forwardRef(
  ProgressLineRender,
) as ProgressLineComponent;
