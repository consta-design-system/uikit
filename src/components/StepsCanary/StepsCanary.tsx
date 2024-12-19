import './Steps.css';

import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

import { Button } from '##/components/Button';
import { useChoiceGroup } from '##/hooks/useChoiceGroup/useChoiceGroup';
import { useMutableRef } from '##/hooks/useMutableRef';
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
    labelWordWrap,
    fitMode = 'scroll',
    ...otherProps
  } = withDefaultGetters(props);

  const listRef = useRef<HTMLDivElement>(null);
  const { refs, scrollTo } = useScrollElements(items, listRef);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getItemLabel,
    callBack: onChange,
    multiple: false,
  });

  const activeStep = items.findIndex(getChecked);

  const mutableRefs = useMutableRef([
    activeStep,
    getOnChange,
    getItemDisabled,
  ] as const);

  const isOverflow =
    useOverflow({ currentRef: listRef }) && fitMode === 'scrollWithButtons';

  const toPrevStep = useCallback((e: React.MouseEvent) => {
    const [currentStep, getOnChange, getDisabled] = mutableRefs.current;
    const nextStep = currentStep - 1;

    if (nextStep >= 0) {
      !getDisabled(items[nextStep]) && getOnChange?.(items[nextStep])(e);
    }
  }, []);

  const toNextStep = useCallback((e: React.MouseEvent) => {
    const [currentStep, getOnChange, getDisabled] = mutableRefs.current;
    const prevStep = currentStep + 1;

    if (prevStep <= items.length - 1) {
      !getDisabled(items[prevStep]) && getOnChange?.(items[prevStep])(e);
    }
  }, []);

  useEffect(() => {
    scrollTo(activeStep);
  }, [activeStep]);

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
          className={cnSteps('ScrollButton', { position: 'left' })}
          iconLeft={IconArrowLeft}
          view="clear"
          onlyIcon
          size="xs"
          type="button"
          onClick={toPrevStep}
        />
      )}
      <div
        ref={listRef}
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
            labelWordWrap={labelWordWrap}
            icon={getItemIcon(item)}
          />
        ))}
      </div>
      {isOverflow && (
        <Button
          className={cnSteps('ScrollButton', { position: 'right' })}
          iconLeft={IconArrowLeft}
          view="clear"
          onlyIcon
          size="xs"
          type="button"
          onClick={toNextStep}
        />
      )}
    </div>
  );
};

export const Steps = forwardRef(StepsRender) as StepsComponent;

export * from './types';
