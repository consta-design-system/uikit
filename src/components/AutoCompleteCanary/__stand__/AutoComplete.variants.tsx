import './AutoComplete.variants.css';

import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconQuestion } from '@consta/icons/IconQuestion';
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
import { cn } from '##/utils/bem';

import {
  getMailItems,
  groups,
  items as itemsArr,
} from '../__mocks__/data.mock';
import { AutoComplete } from '../AutoCompleteCanary';

const cnAutoCompleteVariants = cn('AutoCompleteVariants');

const Variants = () => {
  const type = useSelect('type', ['text', 'email'], 'text');
  const width = useSelect(
    'width',
    textFieldPropWidth,
    textFieldPropWidthDefault,
  );
  const form = useSelect('form', textFieldPropForm, textFieldPropFormDefault);
  const dropdownForm = useSelect(
    'dropdownForm',
    ['default', 'brick', 'round'],
    undefined,
  );
  const status = useSelect('status', textFieldPropStatus);
  const size = useSelect('size', textFieldPropSize, textFieldPropSizeDefault);
  const view = useSelect('view', textFieldPropView, textFieldPropViewDefault);
  const disabled = useBoolean('disabled', false);
  const required = useBoolean('required', false);
  const withClearButton = useBoolean('withClearButton', false);
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
      className={cnAutoCompleteVariants()}
      items={items}
      dropdownForm={dropdownForm}
      groups={withGroups ? groups : []}
      type={type}
      required={required}
      withClearButton={withClearButton}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={handleChange}
      labelIcon={withLabelIcon ? IconQuestion : undefined}
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
