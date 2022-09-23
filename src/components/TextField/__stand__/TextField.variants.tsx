import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { IconPhoto } from '../../../icons/IconPhoto/IconPhoto';
import {
  TextField,
  textFieldPropForm,
  textFieldPropFormDefault,
  textFieldPropSize,
  textFieldPropSizeDefault,
  textFieldPropStatus,
  textFieldPropView,
  textFieldPropViewDefault,
  textFieldPropWidth,
  textFieldPropWidthDefault,
} from '../TextField';

const Variants = () => {
  const type = useSelect(
    'type',
    ['text', 'number', 'textarea', 'password'],
    'text',
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
  const min = useNumber('min', 0, Boolean(incrementButtons));
  const max = useNumber('max', 150, Boolean(incrementButtons));
  const width = useSelect(
    'width',
    textFieldPropWidth,
    textFieldPropWidthDefault,
  );
  const form = useSelect('form', textFieldPropForm, textFieldPropFormDefault);
  const status = useSelect('status', ['', ...textFieldPropStatus], '');
  const size = useSelect('size', textFieldPropSize, textFieldPropSizeDefault);
  const view = useSelect('view', textFieldPropView, textFieldPropViewDefault);
  const disabled = useBoolean('disabled', false);
  const required = useBoolean('required', false);
  const withClearButton = useBoolean('withClearButton', false);
  const caption = useText('caption', 'Подпись');
  const label = useText('label', 'Заголовок');
  const labelPosition = useSelect('labelPosition', ['top', 'left'], 'top');
  const maxLength = useNumber('maxLength', 200);

  const placeholder = useText('placeholder', 'Подсказка в поле');
  const leftSideType = useSelect(
    'leftSideType',
    ['icon', 'text', 'false'],
    'false',
  );
  const leftSideText = useText('leftSideText', 'from');
  const rightSideType = useSelect(
    'rightSideType',
    ['icon', 'text', 'false'],
    'false',
  );
  const rightSideText = useText('rightSideText', 'm²');

  const [value, setValue] = useState<string | null | undefined>(undefined);
  const leftSideSelect = {
    text: leftSideText,
    icon: IconPhoto,
    false: undefined,
  };

  const rightSideSelect = {
    text: rightSideText,
    icon: IconPhoto,
    false: undefined,
  };

  const stepArray = ['10', '50', '100'];
  const numberStepArray = stepArray.map((val) => Number(val));

  const leftSide = leftSideSelect[leftSideType];
  const rightSide = rightSideSelect[rightSideType];

  const handleChange = ({ value }: { value: string | null }) => {
    setValue(value);
  };

  return (
    <TextField
      value={value}
      width={width}
      form={form}
      status={status || undefined}
      size={size}
      view={view}
      type={type}
      required={required}
      step={withStepArray ? numberStepArray : step}
      min={min}
      max={max}
      withClearButton={withClearButton}
      incrementButtons={incrementButtons}
      maxLength={maxLength}
      minRows={minRows}
      maxRows={maxRows}
      placeholder={placeholder}
      onChange={handleChange}
      leftSide={leftSide}
      rightSide={rightSide}
      disabled={disabled}
      label={label}
      caption={caption}
      labelPosition={labelPosition}
    />
  );
};

export default Variants;
