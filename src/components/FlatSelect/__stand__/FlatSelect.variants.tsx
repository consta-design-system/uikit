import { IconAdd } from '@consta/icons/IconAdd';
import { IconFunnel } from '@consta/icons/IconFunnel';
import { IconKebab } from '@consta/icons/IconKebab';
import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import { IconSelect } from '@consta/icons/IconSelect';
import { useBoolean, useSelect } from '@consta/stand';
import { Button } from '@consta/uikit/Button';
import { FieldGroup } from '@consta/uikit/FieldGroup';
import { Space } from '@consta/uikit/MixSpace';
import { TextField } from '@consta/uikit/TextFieldCanary';
import React, { useState } from 'react';

import {
  fieldPropForm,
  fieldPropFormDefault,
  fieldPropSize,
  fieldPropSizeDefault,
  fieldPropStatus,
  fieldPropView,
  fieldPropViewDefault,
} from '##/components/FieldComponents/__mocks__/variants';

import { FlatSelect } from '..';

const items: string[] = [
  'первый',
  'второй',
  'третий',
  'четвертый',
  'пятый',
  'шестой',
  'седьмой',
  'восьмой',
];

const getItem = (item: string) => item;

const Variants = () => {
  const size = useSelect('size', fieldPropSize, fieldPropSizeDefault);
  const view = useSelect('view', fieldPropView, fieldPropViewDefault);
  const form = useSelect('form', ['default', 'brick', 'round'], 'default');
  const bordered = useBoolean('bordered', false);

  const [value, setValue] = useState<string[] | null>([]);

  return (
    <div style={{ width: '100%' }}>
      <FlatSelect
        items={items}
        getItemLabel={getItem}
        getItemKey={getItem}
        onChange={setValue}
        placeholder="Поиск"
        value={value}
        size={size}
        view={view}
        bordered={bordered}
        form={form}
        // footer={[
        //   <Button label="Сбросить" size="xs" view="ghost" />,
        //   <Button label="Применить" size="xs" />,
        // ]}
        multiple
      />
    </div>
  );
};

export default Variants;
