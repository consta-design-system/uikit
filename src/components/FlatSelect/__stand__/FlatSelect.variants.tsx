import './FlatSelect.variants.css';

import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import { useBoolean, useSelect, useText } from '@consta/stand';
import { Button } from '@consta/uikit/Button';
import React, { useRef, useState } from 'react';

import {
  fieldPropSize,
  fieldPropSizeDefault,
  fieldPropView,
  fieldPropViewDefault,
} from '##/components/FieldComponents/__mocks__/variants';
import { useSearch } from '##/components/SelectCanary';
import { cn } from '##/utils/bem';

import { FlatSelect, FlatSelectItemDefault } from '..';
import { groups as groupsMock, items } from '../__mocks__/data.mock';

const cnFlatSelectVariants = cn('FlatSelectVariants');

const Variants = () => {
  const input = useBoolean('input', false);
  const clearButton = useBoolean('clearButton', false, input);
  const iconLeft = useBoolean('iconLeft', false, input);
  const multiple = useBoolean('multiple', false);
  const selectAll = useBoolean('selectAll', false, multiple);
  const groups = useBoolean('groups', false);
  const withAnchor = useBoolean('withAnchor', false);
  const size = useSelect('size', fieldPropSize, fieldPropSizeDefault);
  const view = useSelect('view', fieldPropView, fieldPropViewDefault);
  const form = useSelect('form', ['default', 'brick', 'round'], 'default');
  const bordered = useBoolean('bordered', false);
  const placeholder = useText('placeholder', 'Поиск');
  const isLoading = useBoolean('isLoading', false);
  const onCreate = useBoolean('onCreate', false);
  const footer = useBoolean('footer', false);
  const disabled = useBoolean('disabled', false);
  const itemDisabled = useBoolean('itemDisabled', false);

  const [value, setValue] = useState<FlatSelectItemDefault | null>(null);
  const [valueMultiple, setValueMultiple] = useState<
    FlatSelectItemDefault[] | null
  >(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const searchProps = useSearch({ items });

  const props = {
    ...(input ? searchProps : { items }),
    disabled,
    input,
    size,
    view,
    form,
    bordered,
    placeholder,
    isLoading,
    onCreate: onCreate ? () => alert('onCreate') : undefined,
    listClassName: cnFlatSelectVariants('List', { input }),
    className: cnFlatSelectVariants(),
    groups: groups ? groupsMock : undefined,
    getItemDisabled: itemDisabled ? undefined : () => false,
    anchorRef: withAnchor ? anchorRef : undefined,
    iconLeft: iconLeft ? IconSearchStroked : undefined,
    clearButton,
    footer: footer
      ? [
          <Button label="Сбросить" size={size} view="ghost" />,
          <Button label="Применить" size={size} />,
        ]
      : undefined,
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {withAnchor && (
        <Button
          label={
            valueMultiple?.length
              ? `Выбрано: ${valueMultiple?.length}`
              : 'Выберите'
          }
          size={size}
          ref={withAnchor ? anchorRef : undefined}
        />
      )}
      {multiple ? (
        <FlatSelect
          {...props}
          value={valueMultiple}
          onChange={setValueMultiple}
          selectAll={selectAll}
          multiple
        />
      ) : (
        <FlatSelect
          {...props}
          value={value}
          onChange={setValue}
          onKeyDown={() => {}}
        />
      )}
    </div>
  );
};

export default Variants;
