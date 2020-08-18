import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Radio } from '../../../Radio';

export function RadioExampleMore() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Когда получать вести с Марса</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Только ночью" />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Когда получать вести с Марса</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Днем" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Ночью" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Когда угодно" checked />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}

export function RadioExampleOne() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Что привезти из космоса</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Кусочек метеорита" checked />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Хвост кометы" checked />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Невесомость в банке" checked />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Как доставить посылку</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="На почту" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Курьером" />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Дроном" checked />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Оставить у двери" />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}

export const RadioExampleChecked = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <p>Как вас постричь</p>
    <div>
      <Radio label="Под бобра" checked />
    </div>
    <div>
      <Radio label="В кружок" />
    </div>
    <div>
      <Radio label="А ля рюс" />
    </div>
    <div>
      <Radio label="С бакендардами" />
    </div>
    <div>
      <Radio label="Только кончики" />
    </div>
  </StoryBookExample>
);
