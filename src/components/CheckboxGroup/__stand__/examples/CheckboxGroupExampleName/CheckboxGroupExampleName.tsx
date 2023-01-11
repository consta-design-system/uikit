import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';

import { Button } from '../../../../Button/Button';
import {
  items,
  itemsGen,
  itemsGen2,
  itemsHead,
  itemsHead2,
  itemsNeg,
  itemsNeg2,
} from '../../../__mocks__/data.mock';
import { CheckboxGroup } from '../../../CheckboxGroup';

type Item = {
  name: string;
  disabled?: boolean;
};

export const CheckboxGroupExampleName = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example>
      <CheckboxGroup
        value={value}
        items={items}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="CheckboxGroup"
      />
    </Example>
  );
};

export const CheckboxGroupExampleHead = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example
      col={{ 0: 1, 2: 760 }}
      separately
      items={[
        {
          label: 'Неправильно',
          status: 'error',
          node: (
            <>
              <Text weight="bold" className={cnMixSpace({ mB: 'm' })}>
                Где деньги?
              </Text>
              <CheckboxGroup
                value={value}
                items={itemsHead}
                getItemLabel={(item) => item.name}
                getItemDisabled={(item) => item.disabled}
                onChange={({ value }) => setValue(value)}
                name="CheckboxGroup"
              />
            </>
          ),
        },
        {
          label: 'Правильно',
          status: 'success',
          node: (
            <>
              <Text weight="bold" className={cnMixSpace({ mB: 'm' })}>
                Где деньги?
              </Text>
              <CheckboxGroup
                value={value}
                items={itemsHead2}
                getItemLabel={(item) => item.name}
                getItemDisabled={(item) => item.disabled}
                onChange={({ value }) => setValue(value)}
                name="CheckboxGroup"
              />
            </>
          ),
        },
      ]}
    />
  );
};

export const CheckboxExampleGroupHead3 = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example>
      <>
        <Text weight="bold" className={cnMixSpace({ mB: 'm' })}>
          Выберите места для хранения денег
        </Text>
        <CheckboxGroup
          value={value}
          items={itemsHead}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name="CheckboxGroup"
        />
      </>
    </Example>
  );
};

export const CheckboxGroupExampleNeg = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example
      col={{ 0: 1, 2: 760 }}
      separately
      items={[
        {
          label: 'Неправильно',
          status: 'error',
          node: (
            <CheckboxGroup
              value={value}
              items={itemsNeg}
              getItemLabel={(item) => item.name}
              getItemDisabled={(item) => item.disabled}
              onChange={({ value }) => setValue(value)}
              name="CheckboxGroup"
            />
          ),
        },
        {
          label: 'Правильно',
          status: 'success',
          node: (
            <CheckboxGroup
              value={value}
              items={itemsNeg2}
              getItemLabel={(item) => item.name}
              getItemDisabled={(item) => item.disabled}
              onChange={({ value }) => setValue(value)}
              name="CheckboxGroup"
            />
          ),
        },
      ]}
    />
  );
};

export const CheckboxGroupExampleGeneral = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example
      col={{ 0: 1, 2: 760 }}
      separately
      items={[
        {
          label: 'Неправильно',
          status: 'error',
          node: (
            <>
              <Text weight="bold" className={cnMixSpace({ mB: 'm' })}>
                Каких булок ещё съесть
              </Text>
              <CheckboxGroup
                value={value}
                items={itemsGen}
                getItemLabel={(item) => item.name}
                getItemDisabled={(item) => item.disabled}
                onChange={({ value }) => setValue(value)}
                name="CheckboxGroup"
              />
            </>
          ),
        },
        {
          label: 'Правильно',
          status: 'success',
          node: (
            <>
              <Text weight="bold" className={cnMixSpace({ mB: 'm' })}>
                Каких булок ещё съесть
              </Text>
              <CheckboxGroup
                value={value}
                items={itemsGen2}
                getItemLabel={(item) => item.name}
                getItemDisabled={(item) => item.disabled}
                onChange={({ value }) => setValue(value)}
                name="CheckboxGroup"
                className={cnMixSpace({ mB: 's' })}
              />
              <Button label="Пропустить этот шаг" view="ghost" />
            </>
          ),
        },
      ]}
    />
  );
};
