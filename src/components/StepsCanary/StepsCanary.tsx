import './Steps.css';

import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { forwardRef, useMemo, useRef, useState } from 'react';

import { Button } from '##/components/Button';
import { useChoiceGroup } from '##/hooks/useChoiceGroup/useChoiceGroup';
import { useOverflow } from '##/hooks/useOverflow/useOverflow';
import { useScrollElements } from '##/hooks/useScrollElements/useScrollElements';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnCanary } from '##/utils/bem';

import { withDefaultGetters } from './helper';
import { StepsStep } from './StepsItem';
import { StepsComponent, StepsProps } from './types';

export const cnSteps = cnCanary('Steps');

const StepsRender = (props: StepsProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    size = 'm',
    items,
    value,
    getItemLabel,
    getItemDisabled,
    getItemIcon,
    getItemStatus,
    getItemDescription,
    onChange,
    className,
    style,
    withNumber,
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
    <div
      {...otherProps}
      ref={ref}
      className={cnSteps({ size }, [className])}
      style={{
        ...style,
        ['--steps-items-length' as string]: items.length,
      }}
    >
      {isOverflow && (
        <Button
          className={cnSteps('ScrollButton')}
          iconLeft={IconArrowLeft}
          view="clear"
          onlyIcon
          size="xs"
          type="button"
          onClick={(e) => changeStep(e, true)}
        />
      )}
      <div
        ref={stepsRef}
        className={cnSteps('List', [cnMixScrollBar({ invisible: true })])}
      >
        {items.map((item, index) => (
          <StepsStep
            key={index}
            ref={refs[index] as React.RefObject<HTMLButtonElement>}
            className={cnSteps('Item')}
            label={getItemLabel(item)}
            number={index + 1}
            withNumber={withNumber}
            size={size}
            active={activeStep === index}
            onChange={getOnChange(item)}
            disabled={getItemDisabled(item)}
            status={getItemStatus(item)}
            description={getItemDescription(item)}
          />
        ))}
      </div>
      {isOverflow && (
        <Button
          className={cnSteps('ScrollButton')}
          iconLeft={IconArrowRight}
          view="clear"
          onlyIcon
          size="xs"
          type="button"
          onClick={(e) => changeStep(e, false)}
        />
      )}
    </div>
  );
};

export const Steps = forwardRef(StepsRender) as StepsComponent;

export * from './types';
