import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Radio } from '../../../Radio';

const emptyFunction = () => action('emptyFunction');

export function RadioExampleMore() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Когда получать вести с Марса</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Только ночью" onChange={emptyFunction} checked={undefined} />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Когда получать вести с Марса</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Днем" onChange={emptyFunction} checked={undefined} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Ночью" onChange={emptyFunction} checked={undefined} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Когда угодно" checked onChange={emptyFunction} />
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
          <Radio label="Кусочек метеорита" onChange={emptyFunction} checked />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Хвост кометы" onChange={emptyFunction} checked />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Невесомость в банке" onChange={emptyFunction} checked />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Как доставить посылку</p>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="На почту" onChange={emptyFunction} checked={undefined} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Курьером" onChange={emptyFunction} checked={undefined} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Дроном" checked onChange={emptyFunction} />
        </div>
        <div className={wp.decorator({ distribute: 'left' })}>
          <Radio label="Оставить у двери" onChange={emptyFunction} checked={undefined} />
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
      <Radio label="Под бобра" checked onChange={emptyFunction} />
    </div>
    <div>
      <Radio label="В кружок" onChange={emptyFunction} checked={undefined} />
    </div>
    <div>
      <Radio label="А ля рюс" onChange={emptyFunction} checked={undefined} />
    </div>
    <div>
      <Radio label="С бакендардами" onChange={emptyFunction} checked={undefined} />
    </div>
    <div>
      <Radio label="Только кончики" onChange={emptyFunction} checked={undefined} />
    </div>
  </StoryBookExample>
);
