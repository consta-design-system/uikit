import React, { useState } from 'react';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { IconPhoto } from '../../../icons/IconPhoto/IconPhoto';
import { createMetadata } from '../../../utils/storybook';
import {
  TextField,
  textFieldPropForm,
  textFieldPropFormDefault,
  textFieldPropSize,
  textFieldPropSizeDefault,
  textFieldPropState,
  textFieldPropView,
  textFieldPropViewDefault,
  textFieldPropWidth,
  textFieldPropWidthDefault,
} from '../TextField';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './TextField.mdx';

const defaultKnobs = () => ({
  width: select('width', textFieldPropWidth, textFieldPropWidthDefault),
  form: select('form', textFieldPropForm, textFieldPropFormDefault),
  state: select('state', ['', ...textFieldPropState], ''),
  size: select('size', textFieldPropSize, textFieldPropSizeDefault),
  view: select('view', textFieldPropView, textFieldPropViewDefault),
  disabled: boolean('disabled', false),
  type: select('type', ['text', 'textarea'], 'text'),
  maxLength: number('maxLength', 200),
  minRows: number('minRows', 1),
  maxRows: number('maxRows', 5),
  placeholder: text('placeholder', 'My placeholder'),
  leftSideType: select('leftSideType', ['icon', 'text', 'false'], 'false'),
  leftSideText: text('leftSideText', 'from'),
  rightSideType: select('rightSideType', ['icon', 'text', 'false'], 'false'),
  rightSideText: text('rightSideText', 'm²'),
});

export function Playground() {
  const {
    width,
    form,
    state,
    size,
    view,
    type,
    maxLength,
    minRows,
    maxRows,
    placeholder,
    leftSideType,
    leftSideText,
    rightSideType,
    rightSideText,
    disabled,
  } = defaultKnobs();
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

  const leftSide = leftSideSelect[leftSideType];
  const rightSide = rightSideSelect[rightSideType];

  const handleChange = ({ value }: { value: string | null }) => {
    setValue(value);
  };

  return (
    <div>
      <TextField
        value={value}
        width={width}
        form={form}
        state={state || undefined}
        size={size}
        view={view}
        type={type}
        maxLength={maxLength}
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        onChange={handleChange}
        leftSide={leftSide}
        rightSide={rightSide}
        disabled={disabled}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Components|/TextField',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
