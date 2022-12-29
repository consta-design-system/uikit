import './Steps.css';

import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { useMemo, useRef, useState } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { useOverflow } from '../../hooks/useOverflow/useOverflow';
import { useScrollElements } from '../../hooks/useScrollElements/useScrollElements';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../Button/Button';
import { StepsStep } from './StepsStep/StepsStep';

export const stepsSizes = ['m', 'l'] as const;
export type StepsPropSize = typeof stepsSizes[number];
export const stepsDefaultSize: StepsPropSize = stepsSizes[0];

export type StepsPropGetLabel<ITEM> = (item: ITEM) => string;
export type StepsPropGetCommon<ITEM> = (item: ITEM) => boolean;
export type StepsPropOnChange<ITEM> = (props: {
  e: React.MouseEvent;
  value: ITEM;
}) => void;

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

  const [activeStep, setActiveStep] = useState<number>(-1);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getLabel,
    callBack: onChange,
    multiple: false,
  });

  useMemo(() => {
    items.forEach((item, index) => {
      if (getChecked(item)) {
        setActiveStep(index);
      }
    });
  }, [items, value]);

  const { refs, scrollTo } = useScrollElements(items);

  const stepsRef = useRef<HTMLDivElement>(null);

  const isOverflow = useOverflow({ currentRef: stepsRef });

  const changeStep = (e: React.MouseEvent, prev: boolean) => {
    if (prev && activeStep !== 0) {
      getOnChange(items[activeStep - 1])(e);
      scrollTo(activeStep - 1);
    }
    if (!prev && activeStep !== items.length - 1) {
      getOnChange(items[activeStep + 1])(e);
      scrollTo(activeStep + 1);
    }
  };

  return (
    <div ref={ref} className={cnSteps({ size }, [className])} {...otherProps}>
      {isOverflow && (
        <Button
          iconLeft={() => <IconArrowLeft size="xs" />}
          view="clear"
          onlyIcon
          size="xs"
          className={cnSteps('Button', { side: 'left' })}
          onClick={(e) => changeStep(e, true)}
        />
      )}
      <div ref={stepsRef} className={cnSteps('List')}>
        {items.map((item, index) => (
          <StepsStep
            key={index}
            ref={refs[index] as React.RefObject<HTMLButtonElement>}
            className={cnSteps('Item')}
            label={
              getCompleted?.(item)
                ? getLabel(item)
                : `${index + 1} ${getLabel(item)}`
            }
            size={size}
            active={activeStep === index}
            onChange={getOnChange(item)}
            completed={getCompleted?.(item)}
            skipped={getSkipped?.(item)}
            disabled={getDisabled?.(item)}
          />
        ))}
      </div>
      {isOverflow && (
        <Button
          iconLeft={() => <IconArrowRight size="xs" />}
          view="clear"
          onlyIcon
          size="xs"
          className={cnSteps('Button', { side: 'right' })}
          onClick={(e) => changeStep(e, false)}
        />
      )}
    </div>
  );
});
