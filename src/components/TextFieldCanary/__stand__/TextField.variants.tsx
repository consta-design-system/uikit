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
import { cnMixHitSlop } from '##/mixs/MixHitSlop';

import {
  TextField,
  textFieldPropForm,
  textFieldPropFormDefault,
  textFieldPropSize,
  textFieldPropSizeDefault,
  textFieldPropStatus,
  textFieldPropView,
  textFieldPropViewDefault,
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
  const min = useNumber('min', 0, type === 'number');
  const max = useNumber('max', 150, type === 'number');
  const form = useSelect('form', textFieldPropForm, textFieldPropFormDefault);
  const status = useSelect('status', textFieldPropStatus);
  const size = useSelect('size', textFieldPropSize, textFieldPropSizeDefault);
  const view = useSelect('view', textFieldPropView, textFieldPropViewDefault);
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
    <div>
      <TextField
        form={form}
        status={status}
        size={size}
        view={view}
        type={type}
        labelIcon={withLabelIcon ? IconQuestion : undefined}
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
        leftSide={leftSide}
        rightSide={rightSide}
        disabled={disabled}
        label={label}
        caption={caption}
        labelPosition={labelPosition}
        style={{ display: 'block' }}
      />
      <FieldControlLayout
        form={form}
        status={status}
        size={size}
        view={view}
        disabled={disabled}
        style={{ display: 'block' }}
        leftSide={[
          <FieldButton className={cnMixHitSlop({ mode: 'after' })}>
            <IconPhoto size={getFieldIconSize(size || 'm')} />
          </FieldButton>,
          'ss',
        ]}
        rightSide={['ss', <FieldClearButton size={size} />, <FieldCounter />]}
      >
        <FieldInput placeholder="fff" />
      </FieldControlLayout>
    </div>
  );
};

export default Variants;
