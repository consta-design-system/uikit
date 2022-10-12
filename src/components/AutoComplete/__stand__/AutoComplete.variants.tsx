import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useMemo, useState } from 'react';

import {
  textFieldPropForm,
  textFieldPropFormDefault,
  textFieldPropSize,
  textFieldPropSizeDefault,
  textFieldPropStatus,
  textFieldPropView,
  textFieldPropViewDefault,
  textFieldPropWidth,
  textFieldPropWidthDefault,
} from '##/components/TextField';

import { IconPhoto } from '../../../icons/IconPhoto/IconPhoto';
import {
  getMailItems,
  groups,
  items as itemsArr,
} from '../__mocks__/data.mock';
import { AutoComplete } from '../AutoComplete';

const Variants = () => {
  const type = useSelect('type', ['text', 'textarea', 'email'], 'text');
  const minRows = useNumber('minRows', 1, type === 'textarea');
  const maxRows = useNumber('maxRows', 5, type === 'textarea');
  const width = useSelect(
    'width',
    textFieldPropWidth,
    textFieldPropWidthDefault,
  );
  const form = useSelect('form', textFieldPropForm, textFieldPropFormDefault);
  const status = useSelect('status', textFieldPropStatus);
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
  const leftSideType = useSelect('leftSideType', ['icon', 'text']);
  const leftSideText = useText('leftSideText', 'from');
  const rightSideType = useSelect('rightSideType', ['icon', 'text']);
  const rightSideText = useText('rightSideText', 'm²');
  const withGroups = useBoolean('withGroups', false);

  const [value, setValue] = useState<string | null | undefined>(undefined);

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

  const handleChange = ({ value }: { value: string | null }) => {
    setValue(value);
  };

  const items = useMemo(() => {
    if (type === 'email') {
      return getMailItems(value);
    }
    return itemsArr;
  }, [value, type]);

  return (
    <AutoComplete
      value={value}
      width={width}
      form={form}
      status={status}
      size={size}
      view={view}
      items={items}
      groups={withGroups ? groups : []}
      type={type}
      required={required}
      withClearButton={withClearButton}
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
