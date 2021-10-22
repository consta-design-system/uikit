import React from 'react';

import { IconProps } from '../../icons/Icon/Icon';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type PropStatus = 'alert' | 'warning' | 'success';

export type PropView = 'default' | 'division';

export const propSize = ['s', 'xs', 'm', 'l'] as const;
export type PropSize = typeof propSize[number];
export const defaultPropSize: PropSize = propSize[1];

type SliderViewTypeValue<RANGE> = RANGE extends true
  ? {
      value?: number[];
    }
  : {
      value?: number;
    };

type SliderViewTypeOnChange<RANGE> = RANGE extends true
  ? {
      onChange?: (prop: { e: React.MouseEvent<HTMLButtonElement>; value: number[] }) => void;
    }
  : {
      onChange?: (prop: { e: React.MouseEvent<HTMLButtonElement>; value: number }) => void;
    };

type Props<RANGE> = {
  className?: string;
  step?: number | number[];
  view?: PropView;
  disabled?: boolean;
  range?: RANGE;
  label?: string;
  caption?: string;
  status?: PropStatus;
  min?: number;
  size?: PropSize;
  max?: number;
  leftSide?: 'input' | React.FC<IconProps>;
  rightSide?: 'input' | React.FC<IconProps>;
};

export type SliderProps<RANGE extends boolean> = PropsWithHTMLAttributes<
  Props<RANGE> & SliderViewTypeValue<RANGE> & SliderViewTypeOnChange<RANGE>,
  HTMLDivElement
>;

export type SliderLineProps = {
  view?: PropView;
  step: number | number[];
  min?: number;
  max?: number;
  range?: boolean;
  value?: number | number[];
};

type CalculateLines = (
  value: number | number[] | undefined,
  min: number,
  max: number,
  view: 'default' | 'division',
  step: number | number[],
) => Line[];

export type Line = {
  size: number;
  active: boolean;
};

export const calculateLines: CalculateLines = (value, min, max, view, step) => {
  const sizesArray: Line[] = [];
  const absoluteSize = Math.abs(max - min);
  if (view === 'default') {
    if (!Array.isArray(value) && value) {
      sizesArray.push({
        size: (1 - (max - value) / absoluteSize) * 100,
        active: true,
      });
      sizesArray.push({
        size: ((max - value) / absoluteSize) * 100,
        active: false,
      });
    } else if (Array.isArray(value) && value) {
      sizesArray.push({
        size: ((value[0] - min) / absoluteSize) * 100,
        active: false,
      });
      sizesArray.push({
        size: ((value[1] - value[0]) / absoluteSize) * 100,
        active: true,
      });
      sizesArray.push({
        size: ((max - value[1]) / absoluteSize) * 100,
        active: false,
      });
    } else {
      sizesArray.push({
        size: 100,
        active: false,
      });
    }
  } else if (!Array.isArray(step)) {
    for (let i = min; i < max; i += step) {
      const width = max - i < step ? max - i : step;
      sizesArray.push({
        size: (width * 100) / absoluteSize,
        active:
          !!value &&
          (!Array.isArray(value) ? i + step < value : i + step >= value[0] && i <= value[1]),
      });
    }
  } else if (Array.isArray(step)) {
    step.forEach((stepSize, index) => {
      sizesArray.push({
        size:
          index === 0
            ? ((stepSize - min) * 100) / absoluteSize
            : ((stepSize - step[index - 1]) * 100) / absoluteSize,
        active:
          !!value &&
          (!Array.isArray(value)
            ? stepSize <= value
            : stepSize <= value[0] &&
              stepSize +
                (index === step.length - 1 ? step[index + 1] - stepSize : max - stepSize) >=
                value[1]),
      });
    });
    sizesArray.push({
      size: ((max - step[step.length - 1]) * 100) / absoluteSize,
      active:
        !!value && (!Array.isArray(value) ? max <= value : max <= value[0] && max >= value[1]),
    });
  }
  return sizesArray;
};
