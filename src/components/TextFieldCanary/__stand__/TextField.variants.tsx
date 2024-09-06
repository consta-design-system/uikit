import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconQuestion } from '@consta/icons/IconQuestion';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React from 'react';

import {
  FieldButton,
  FieldClearButton,
  FieldControlLayout,
  FieldCounter,
  FieldInput,
  getFieldIconSize,
} from '##/components/Field';
import {
  fieldPropForm,
  fieldPropFormDefault,
  fieldPropSize,
  fieldPropSizeDefault,
  fieldPropStatus,
  fieldPropView,
  fieldPropViewDefault,
} from '##/components/Field/__mocks__/variants';
import { cnMixHitSlop } from '##/mixs/MixHitSlop';

import { TextField } from '..';

const Variants = () => {
  const type = useSelect(
    'type',
    ['text', 'number', 'textarea', 'password'],
    'number',
  );
  const minRows = useNumber('minRows', 1, type === 'textarea');
  const maxRows = useNumber('maxRows', 5, type === 'textarea');
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
  const required = useBoolean('required', false);
  const withClearButton = useBoolean(
    'withClearButton',
    true,
    !incrementButtons,
  );
  const caption = useText('caption', 'Подпись');
  const label = useText('label', 'Заголовок');
  const withLabelIcon = useBoolean('withLabelIcon', false);
  const labelPosition = useSelect('labelPosition', ['top', 'left'], 'top');
  const maxLength = useNumber('maxLength', 200);

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

  const stepArray = ['10', '50', '100'];
  const numberStepArray = stepArray.map((val) => Number(val));

  const leftSide = leftSideType && leftSideSelect[leftSideType];
  const rightSide = rightSideType && rightSideSelect[rightSideType];

  return (
    <div style={{ width: '100%' }}>
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
        incrementButtons={incrementButtons}
        min={min}
        max={max}
        step={withStepArray ? numberStepArray : step}
      />
    </div>
  );
};

export default Variants;
