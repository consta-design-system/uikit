import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Button } from '../../../../Button/Button';
import { Checkbox } from '../../../Checkbox';

export function CheckboxExampleHead() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Где деньги?</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Тумбочка" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Банк" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Матрас" />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Где деньги?</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="В тумбочке" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="В банке" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Под матрасом, в потайном кармашке" />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}

export const CheckboxExampleHead2 = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <p>Выберите место для хранения денег</p>
    <div>
      <Checkbox label="Тумбочка" />
    </div>
    <div>
      <Checkbox label="Банк" />
    </div>
    <div>
      <Checkbox label="Матрас" />
    </div>
  </StoryBookExample>
);

export function CheckboxExampleNegation() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Hе хочу больше этих ваших дурацких булок" checked />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Съесть ещё этих мягких французских булок" />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}

export function CheckboxExampleGeneralization() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Каких булок ещё съесть</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Этих" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Мягких" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Сладких" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Французских" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Никаких" />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Каких булок ещё съесть</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Этих" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Мягких" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Сладких" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Checkbox label="Французских" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Button label="Пропустить этот шаг" />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}
