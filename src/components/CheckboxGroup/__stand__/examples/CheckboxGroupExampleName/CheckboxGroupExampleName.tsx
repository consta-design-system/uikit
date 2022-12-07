import { Example } from '@consta/stand';
import React from 'react';

import { cnMixSpace } from '##/mixs/MixSpace/MixSpace';
import { cnDocsExample } from '##/uiKit/components/DocsExample';

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
    <Example col={{ 0: 1, 2: 760 }}>
      <div>
        <p className={cnDocsExample('Caption')}>
          <b>Где деньги?</b>
        </p>

        <CheckboxGroup
          value={value}
          items={itemsHead}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name="CheckboxGroup"
        />

        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
      </div>
      <div>
        <p className={cnDocsExample('Caption')}>
          <b>Где деньги?</b>
        </p>

        <CheckboxGroup
          value={value}
          items={itemsHead2}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name="CheckboxGroup"
        />

        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </Example>
  );
};

export const CheckboxExampleGroupHead3 = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example>
      <CheckboxGroup
        value={value}
        items={itemsHead}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="CheckboxGroup"
      />
    </Example>
  );
};

export const CheckboxGroupExampleNeg = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example col={{ 0: 1, 2: 760 }}>
      <div className={cnDocsExample()}>
        <CheckboxGroup
          value={value}
          items={itemsNeg}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name="CheckboxGroup"
        />

        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
      </div>
      <div className={cnDocsExample()}>
        <CheckboxGroup
          value={value}
          items={itemsNeg2}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name="CheckboxGroup"
        />

        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </Example>
  );
};

export const CheckboxGroupExampleGeneral = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example col={{ 0: 1, 2: 760 }}>
      <div>
        <p className={cnDocsExample('Caption')}>
          <b>Каких булок ещё съесть</b>
        </p>
        <div className={cnMixSpace({ mB: '4xl' })}>
          <CheckboxGroup
            value={value}
            items={itemsGen}
            getItemLabel={(item) => item.name}
            getItemDisabled={(item) => item.disabled}
            onChange={({ value }) => setValue(value)}
            name="CheckboxGroup"
          />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
      </div>
      <div>
        <p className={cnDocsExample('Caption')}>
          <b>Каких булок ещё съесть</b>
        </p>

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

        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </Example>
  );
};
