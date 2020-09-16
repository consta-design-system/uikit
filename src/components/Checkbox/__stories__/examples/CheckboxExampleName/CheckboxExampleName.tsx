import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { useChoiceGroup } from '../../../../../hooks/useChoiceGroup/useChoiceGroup';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Button } from '../../../../Button/Button';
import { Checkbox } from '../../../Checkbox';

const emptyFunction = action('emptyFunction');

export function CheckboxExampleHead() {
  const [value, setValue] = useState<number[] | null>(null);
  const { getOnChange, getChecked } = useChoiceGroup<number, React.ChangeEvent<HTMLInputElement>>({
    value,
    getKey: (item) => item,
    callBack: ({ value }) => setValue(value),
    multiple: true,
  });

  const getCheckAttributes = (id: number) => {
    return {
      checked: getChecked(id),
      onChange: ({ e }: { e: React.ChangeEvent<HTMLInputElement> }) => getOnChange(id)(e),
    };
  };

  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Где деньги?</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Тумбочка" {...getCheckAttributes(1)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Банк" {...getCheckAttributes(2)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Матрас" {...getCheckAttributes(3)} />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Где деньги?</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="В тумбочке" {...getCheckAttributes(1)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="В банке" {...getCheckAttributes(2)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Под матрасом, в потайном кармашке" {...getCheckAttributes(3)} />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}

export const CheckboxExampleHead2 = () => {
  const [value, setValue] = useState<number[] | null>(null);
  const { getOnChange, getChecked } = useChoiceGroup<number, React.ChangeEvent<HTMLInputElement>>({
    value,
    getKey: (item) => item,
    callBack: ({ value }) => setValue(value),
    multiple: true,
  });

  const getCheckAttributes = (id: number) => {
    return {
      checked: getChecked(id),
      onChange: ({ e }: { e: React.ChangeEvent<HTMLInputElement> }) => getOnChange(id)(e),
    };
  };

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p>Выберите место для хранения денег</p>
      <div>
        <Checkbox label="Тумбочка" {...getCheckAttributes(1)} />
      </div>
      <div>
        <Checkbox label="Банк" {...getCheckAttributes(2)} />
      </div>
      <div>
        <Checkbox label="Матрас" {...getCheckAttributes(3)} />
      </div>
    </StoryBookExample>
  );
};

export function CheckboxExampleNegation() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox
            onChange={emptyFunction}
            label="Hе хочу больше этих ваших дурацких булок"
            checked
          />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox
            onChange={emptyFunction}
            label="Съесть ещё этих мягких французских булок"
            checked={false}
          />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}

export function CheckboxExampleGeneralization() {
  const [value, setValue] = useState<number[] | null>(null);
  const { getOnChange, getChecked } = useChoiceGroup<number, React.ChangeEvent<HTMLInputElement>>({
    value,
    getKey: (item) => item,
    callBack: ({ value }) => setValue(value),
    multiple: true,
  });

  const getCheckAttributes = (id: number) => {
    return {
      checked: getChecked(id),
      onChange: ({ e }: { e: React.ChangeEvent<HTMLInputElement> }) => getOnChange(id)(e),
    };
  };

  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Каких булок ещё съесть</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Этих" {...getCheckAttributes(1)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Мягких" {...getCheckAttributes(2)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Сладких" {...getCheckAttributes(3)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Французских" {...getCheckAttributes(4)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Никаких" {...getCheckAttributes(5)} />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Каких булок ещё съесть</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Этих" {...getCheckAttributes(1)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Мягких" {...getCheckAttributes(2)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Сладких" {...getCheckAttributes(3)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Французских" {...getCheckAttributes(4)} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Button label="Пропустить этот шаг" />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}
