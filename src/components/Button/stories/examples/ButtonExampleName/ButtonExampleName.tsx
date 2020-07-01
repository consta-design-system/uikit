import React from 'react';

import { IconArrowLeft } from '../../../../../icons/IconArrowLeft/IconArrowLeft';
import { IconArrowRight } from '../../../../../icons/IconArrowRight/IconArrowRight';
import { IconEdit } from '../../../../../icons/IconEdit/IconEdit';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Button } from '../../../Button';

const cnExample = cn('Example');

export function ButtonExampleNameSemantics() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnExample()}>
        <p className={cnExample('Caption')}>Ракета к запуску готова.</p>
        <Button label="OK" />
        <p className={cnExample('Status', { view: 'wrong' })}>Неправильно</p>
        <p className={cnExample('Caption')}>
          Непонятно, что будет, если нажать на кнопку. Скорее всего, ничего, но это не точно.
        </p>
      </div>
      <div className={cnExample()}>
        <p className={cnExample('Caption')}>Ракета к запуску готова.</p>
        <Button label="Запустить" />
        <p className={cnExample('Status', { view: 'right' })}>Правильно</p>
        <p className={cnExample('Caption')}>
          Понятно, что если нажать на кнопку, ракета отправится в полёт.
        </p>
      </div>
    </div>
  );
}

export function ButtonExampleNameVerb() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnExample()}>
        <Button label="Поиск" />
        <Button label="Искать" />
        <p className={cnExample('Status', { view: 'wrong' })}>Неправильно</p>
        <p className={cnExample('Caption')}>Предлагаем поискать, но результат не гарантируем.</p>
      </div>
      <div className={cnExample()}>
        <Button label="Найти" />
        <p className={cnExample('Status', { view: 'right' })}>Правильно</p>
        <p className={cnExample('Caption')}>
          Внимание на результат: обязательно найдём то, что вы ищете.
        </p>
      </div>
    </div>
  );
}

export function ButtonExampleNameSingleLine() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnExample()}>
        <Button
          label="Скачать файл презентации"
          style={{ width: '200px', whiteSpace: 'normal', height: 'auto' }}
        />
        <p className={cnExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnExample()}>
        <Button label="Скачать" />
        <p className={cnExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}

export function ButtonExampleNameOverflow() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnExample()}>
        <Button label="Редактировать" style={{ width: '130px' }} />
        <p className={cnExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnExample()}>
        <Button label="Редактировать" />{' '}
        <Button label="Редактировать" iconRight={IconEdit} iconSize="xs" onlyIcon />
        <p className={cnExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}

export function ButtonExampleNameNaviguation() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Сюда" iconLeft={IconArrowLeft} />
      </div>
      <div className={cnExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Туда" iconRight={IconArrowRight} />
      </div>
    </div>
  );
}

export function ButtonExampleNameAgreement() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnExample()}>
        <p className={cnExample('Caption')}>Мы используем куки! Без них всё совсем сломается :(</p>
        <Button label="Понятно" />
      </div>
      <div className={cnExample()}>
        <p className={cnExample('Caption')}>Примите лиценизонное соглашение, ну пожааалуйста.</p>
        <Button label="Принимаю" />
      </div>
    </div>
  );
}
