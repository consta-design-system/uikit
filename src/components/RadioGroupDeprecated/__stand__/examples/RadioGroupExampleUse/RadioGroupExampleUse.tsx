import React from 'react';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { RadioGroup } from '../../../RadioGroupDeprecated';

const itemsOne = ['Только ночью'];

const itemsTwo = ['Днём', 'Ночью', 'Когда угодно'];

const itemsThree = ['Кусочек метеорита', 'Хвост кометы', 'Невесомость в банке'];

const itemsFour = ['На почту', 'Курьером', 'Дроном', 'Оставить у двери'];

const itemsChecked = [
  'Под бобра',
  'В кружок',
  'А ля рюс',
  'С бакенбардами',
  'Только кончики',
];

export function RadioGroupExampleMore() {
  const [value, setValue] = React.useState<string | null>(itemsOne[0]);
  const [valueTwo, setValueTwo] = React.useState<string | null>(itemsTwo[0]);

  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ mT: 'm', mL: 'm', mR: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            <b>Когда получать вести с Марса</b>
          </p>
          <div className={wp.decorator({ distribute: 'left' })}>
            <RadioGroup
              value={value}
              items={itemsOne}
              getLabel={(item) => item}
              onChange={({ value }) => setValue(value)}
            />
          </div>
        </div>
      </div>
      <div className={cnMixSpace({ mT: 'm', mL: 'm', mR: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            <b>Когда получать вести с Марса</b>
          </p>
          <div className={wp.decorator({ distribute: 'left' })}>
            <RadioGroup
              value={valueTwo}
              items={itemsTwo}
              getLabel={(item) => item}
              onChange={({ value }) => setValueTwo(value)}
            />
          </div>
        </div>
      </div>
      <div className={cnMixSpace({ mB: 'm', mL: 'm', mR: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Status', { view: 'wrong' })}>
            Неправильно
          </p>
        </div>
      </div>
      <div className={cnMixSpace({ mB: 'm', mL: 'm', mR: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
        </div>
      </div>
    </div>
  );
}

export function RadioGroupExampleOne() {
  const [value, setValue] = React.useState<string | null>(itemsThree[0]);
  const [valueTwo, setValueTwo] = React.useState<string | null>(itemsFour[0]);

  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ mT: 'm', mL: 'm', mR: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            <b>Что привезти из космоса</b>
          </p>
          <div className={wp.decorator({ distribute: 'left' })}>
            <RadioGroup
              value={value}
              items={itemsThree}
              getLabel={(item) => item}
              onChange={({ value }) => setValue(value)}
            />
          </div>
        </div>
      </div>
      <div className={cnMixSpace({ mT: 'm', mL: 'm', mR: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            <b>Как получить посылку</b>
          </p>
          <div className={wp.decorator({ distribute: 'left' })}>
            <RadioGroup
              value={valueTwo}
              items={itemsFour}
              getLabel={(item) => item}
              onChange={({ value }) => setValueTwo(value)}
            />
          </div>
        </div>
      </div>
      <div className={cnMixSpace({ mB: 'm', mL: 'm', mR: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Status', { view: 'wrong' })}>
            Неправильно
          </p>
        </div>
      </div>
      <div className={cnMixSpace({ mB: 'm', mL: 'm', mR: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
        </div>
      </div>
    </div>
  );
}

export function RadioGroupExampleChecked() {
  const [value, setValue] = React.useState<string | null>(itemsChecked[0]);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p className={cnDocsExample('Caption')}>
        <b>Как вас постричь</b>
      </p>
      <RadioGroup
        value={value}
        items={itemsChecked}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
}
