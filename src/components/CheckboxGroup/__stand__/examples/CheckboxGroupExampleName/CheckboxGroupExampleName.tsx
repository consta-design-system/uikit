import React from 'react';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
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
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p className={cnDocsExample('Caption')}>
        <b>Выберите номер</b>
      </p>
      <CheckboxGroup
        value={value}
        items={items}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="CheckboxGroup"
      />
    </StoryBookExample>
  );
};

export const CheckboxGroupExampleHead = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            <b>Где деньги?</b>
          </p>
          <div className={wp.decorator({ distribute: 'left' })}>
            <CheckboxGroup
              value={value}
              items={itemsHead}
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
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            <b>Где деньги?</b>
          </p>
          <div className={wp.decorator({ distribute: 'left' })}>
            <CheckboxGroup
              value={value}
              items={itemsHead2}
              getItemLabel={(item) => item.name}
              getItemDisabled={(item) => item.disabled}
              onChange={({ value }) => setValue(value)}
              name="CheckboxGroup"
            />
          </div>
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
        </div>
      </div>
    </div>
  );
};

export const CheckboxExampleGroupHead3 = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p className={cnDocsExample('Caption')}>
        <b>Выберите места для хранения денег</b>
      </p>
      <CheckboxGroup
        value={value}
        items={itemsHead}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="CheckboxGroup"
      />
    </StoryBookExample>
  );
};

export const CheckboxGroupExampleNeg = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <div className={wp.decorator({ distribute: 'left' })}>
            <CheckboxGroup
              value={value}
              items={itemsNeg}
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
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <div className={wp.decorator({ distribute: 'left' })}>
            <CheckboxGroup
              value={value}
              items={itemsNeg2}
              getItemLabel={(item) => item.name}
              getItemDisabled={(item) => item.disabled}
              onChange={({ value }) => setValue(value)}
              name="CheckboxGroup"
            />
          </div>
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
        </div>
      </div>
    </div>
  );
};

export const CheckboxGroupExampleGeneral = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            <b>Каких булок ещё съесть</b>
          </p>
          <div className={cnMixSpace({ mB: '4xl' })}>
            <div className={wp.decorator({ distribute: 'left' })}>
              <CheckboxGroup
                value={value}
                items={itemsGen}
                getItemLabel={(item) => item.name}
                getItemDisabled={(item) => item.disabled}
                onChange={({ value }) => setValue(value)}
                name="CheckboxGroup"
              />
            </div>
          </div>
          <p className={cnDocsExample('Status', { view: 'wrong' })}>
            Неправильно
          </p>
        </div>
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            <b>Каких булок ещё съесть</b>
          </p>
          <div className={wp.decorator({ distribute: 'left' })}>
            <CheckboxGroup
              value={value}
              items={itemsGen2}
              getItemLabel={(item) => item.name}
              getItemDisabled={(item) => item.disabled}
              onChange={({ value }) => setValue(value)}
              name="CheckboxGroup"
            />
          </div>
          <div
            className={wp.decorator({ 'distribute': 'left', 'indent-t': 'm' })}
          >
            <Button label="Пропустить этот шаг" view="ghost" />
          </div>
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
        </div>
      </div>
    </div>
  );
};
