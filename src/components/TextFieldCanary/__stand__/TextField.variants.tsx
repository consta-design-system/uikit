import { IconPhoto } from '@consta/icons/IconPhoto';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { FieldWrapper } from '##/components/FieldComponents';
import {
  fieldPropForm,
  fieldPropFormDefault,
  fieldPropSize,
  fieldPropSizeDefault,
  fieldPropStatus,
  fieldPropView,
  fieldPropViewDefault,
} from '##/components/FieldComponents/__mocks__/variants';

import { TextField } from '..';

const getStep = (
  type: string | undefined,
  withStepArray: boolean,
  step: number | undefined,
) => {
  if (type !== 'number') {
    return undefined;
  }

  if (withStepArray) {
    return [10, 50, 100];
  }

  return step;
};

const Variants = () => {
  const [value, setValue] = useState<string[] | null>([
    'Один',
    'Два',
    'Три',
    'Четыре',
    'Пять',
    // 'Шесть',
    // 'Семь',
    // 'Восемь',
  ]);

  const type = useSelect(
    'type',
    ['text', 'number', 'textArea', 'password', 'textArray'],
    'text',
  );

  const step = useNumber('step', 1, type === 'number');
  const withStepArray = useBoolean('withStepArray', false, type === 'number');
  const incrementButtons = useBoolean(
    'incrementButtons',
    true,
    type === 'number',
  );
  const min = useNumber('min', 0, type === 'number');
  const max = useNumber('max', 150, type === 'number');
  const form = useSelect('form', fieldPropForm, fieldPropFormDefault);
  const status = useSelect('status', fieldPropStatus);
  const size = useSelect('size', fieldPropSize, fieldPropSizeDefault);
  const view = useSelect('view', fieldPropView, fieldPropViewDefault);
  const disabled = useBoolean('disabled', false);
  const withClearButton = useBoolean('withClearButton', true);
  const minRows = useNumber('minRows', 1, type === 'textArea');
  const maxRows = useNumber('maxRows', 5, type === 'textArea');
  const maxLength = useNumber('maxLength', 200, type !== 'number');
  const placeholder = useText('placeholder', 'Подсказка в поле');
  const leftSideType = useSelect('leftSideType', ['icon', 'text']);
  const leftSideText = useText('leftSideText', 'from');
  const rightSideType = useSelect('rightSideType', ['icon', 'text']);
  const rightSideText = useText('rightSideText', 'm²');

  const leftSideSelect = {
    text: leftSideText,
    icon: IconPhoto,
  };

  const rightSideSelect = {
    text: rightSideText,
    icon: IconPhoto,
  };

  const leftSide = leftSideType && leftSideSelect[leftSideType];
  const rightSide = rightSideType && rightSideSelect[rightSideType];

  return (
    <FieldWrapper
      style={{ width: '100%' }}
      label="Заголовок"
      required
      labelIcon={IconPhoto}
      size="m"
      side="md"
      caption="Подпись подпись"
      counter={[10, 100]}
    >
      <TextField
        form={form}
        status={status}
        size={size}
        view={view}
        disabled={disabled}
        style={{ display: 'block' }}
        leftSide={leftSide}
        rightSide={rightSide}
        maxLength={maxLength}
        withClearButton={withClearButton}
        placeholder={placeholder}
        type={type}
        value={type === 'textArray' ? value : undefined}
        // onChange={type === 'textArray' ? setValue : undefined}
        incrementButtons={type === 'number' ? incrementButtons : undefined}
        min={type === 'number' ? min : undefined}
        max={type === 'number' ? max : undefined}
        step={getStep(type, withStepArray, step)}
        maxRows={type === 'textArray' ? maxRows : undefined}
        minRows={type === 'textArray' ? minRows : undefined}
      />
    </FieldWrapper>
  );
};

export default Variants;
