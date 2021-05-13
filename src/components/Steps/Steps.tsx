import './Steps.css';

import React from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

import { StepsStep } from './StepsStep/StepsStep';

export const stepsSizes = ['m', 'l'] as const;
export type StepsPropSize = typeof stepsSizes[number];
export const stepsDefaultSize: StepsPropSize = stepsSizes[0];

export type StepsPropGetLabel<ITEM> = (item: ITEM) => string;
export type StepsPropGetCommon<ITEM> = (item: ITEM) => boolean;
export type StepsPropOnChange<ITEM> = (props: { e: React.MouseEvent; value: ITEM }) => void;

type Props<ITEM> = {
  size?: StepsPropSize;
  items: ITEM[];
  value: ITEM;
  getLabel: StepsPropGetLabel<ITEM>;
  getDisabled?: StepsPropGetCommon<ITEM>;
  getCompleted?: StepsPropGetCommon<ITEM>;
  getSkipped?: StepsPropGetCommon<ITEM>;
  onChange: StepsPropOnChange<ITEM>;
  className?: string;
};

type Steps = <ITEM>(
  props: PropsWithHTMLAttributesAndRef<Props<ITEM>, HTMLDivElement>,
) => React.ReactElement | null;

export const cnSteps = cn('Steps');

export const Steps: Steps = React.forwardRef((props, ref) => {
  const {
    size = stepsDefaultSize,
    items,
    value,
    getLabel,
    getDisabled,
    getCompleted,
    getSkipped,
    onChange,
    className,
    ...otherProps
  } = props;

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getLabel,
    callBack: onChange,
    multiple: false,
  });

  return (
    <div ref={ref} className={cnSteps({ size }, [className])} {...otherProps}>
      {items.map((item, index) => (
        <StepsStep
          key={index}
          className={cnSteps('Item')}
          label={getCompleted?.(item) ? getLabel(item) : `${index + 1} ${getLabel(item)}`}
          size={size}
          active={getChecked(item)}
          onChange={getOnChange(item)}
          completed={getCompleted?.(item)}
          skipped={getSkipped?.(item)}
          disabled={getDisabled?.(item)}
        />
      ))}
    </div>
  );
});
