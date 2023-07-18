import './Steps.css';

import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { forwardRef, useMemo, useRef, useState } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { useOverflow } from '../../hooks/useOverflow/useOverflow';
import { useScrollElements } from '../../hooks/useScrollElements/useScrollElements';
import { cn } from '../../utils/bem';
import { Button } from '../Button/Button';
import { withDefaultGetters } from './helper';
import { StepsStep } from './StepsStep/StepsStep';
import { StepsCompnent, stepsDefaultSize, StepsProps } from './types';

export const cnSteps = cn('Steps');

const StepsRender = (props: StepsProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    size = stepsDefaultSize,
    items,
    value,
    getItemLabel,
    getItemDisabled,
    getItemCompleted,
    getItemSkipped,
    onChange,
    className,
    ...otherProps
  } = withDefaultGetters(props);

  const [activeStep, setActiveStep] = useState<number>(-1);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getItemLabel,
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
          type="button"
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
            label={getItemLabel(item)}
            step={index + 1}
            size={size}
            active={activeStep === index}
            onChange={getOnChange(item)}
            completed={getItemCompleted?.(item)}
            skipped={getItemSkipped?.(item)}
            disabled={getItemDisabled?.(item)}
          />
        ))}
      </div>
      {isOverflow && (
        <Button
          iconLeft={() => <IconArrowRight size="xs" />}
          view="clear"
          onlyIcon
          size="xs"
          type="button"
          className={cnSteps('Button', { side: 'right' })}
          onClick={(e) => changeStep(e, false)}
        />
      )}
    </div>
  );
};

export const Steps = forwardRef(StepsRender) as StepsCompnent;

export * from './types';
