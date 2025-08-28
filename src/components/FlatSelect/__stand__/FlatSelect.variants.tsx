import './FlatSelect.variants.css';

import { IconAdd } from '@consta/icons/IconAdd';
import { IconFunnel } from '@consta/icons/IconFunnel';
import { IconKebab } from '@consta/icons/IconKebab';
import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import { IconSelect } from '@consta/icons/IconSelect';
import { useBoolean, useSelect, useText } from '@consta/stand';
import { Button } from '@consta/uikit/Button';
import { FieldGroup } from '@consta/uikit/FieldGroup';
import { Space } from '@consta/uikit/MixSpace';
import { TextField } from '@consta/uikit/TextFieldCanary';
import React, { useRef, useState } from 'react';

import {
  fieldPropForm,
  fieldPropFormDefault,
  fieldPropSize,
  fieldPropSizeDefault,
  fieldPropStatus,
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
  const withAnchor = useBoolean('withAnchor', true);
  const size = useSelect('size', fieldPropSize, fieldPropSizeDefault);
  const view = useSelect('view', fieldPropView, fieldPropViewDefault);
  const form = useSelect('form', ['default', 'brick', 'round'], 'default');
  const bordered = useBoolean('bordered', false);
  const placeholder = useText('placeholder', 'Поиск');
  const isLoading = useBoolean('isLoading', false);
  const onCreate = useBoolean('onCreate', false);
  const footer = useBoolean('footer', false);
  const [value, setValue] = useState<FlatSelectItemDefault | null>(null);
  const searchProps = useSearch({ items });
  const disabled = useBoolean('disabled', false);
  const itemDisabled = useBoolean('itemDisabled', false);

  const [valueMultiple, setValueMultiple] = useState<
    FlatSelectItemDefault[] | null
  >(null);

  const anchorRef = useRef<HTMLButtonElement>(null);

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
        <FlatSelect {...props} value={value} onChange={setValue} />
      )}
    </div>
  );
};

export default Variants;
