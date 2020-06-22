import React from 'react';

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
        <Button label="OK" />
        <p className={cnExample('Status', { view: 'wrong' })}>Неправильно</p>
        <p className={cnExample('Caption')}>Непонятно что произойдет по нажатию</p>
      </div>
      <div className={cnExample()}>
        <Button label="Сохранить" />
        <p className={cnExample('Status', { view: 'right' })}>Правильно</p>
        <p className={cnExample('Caption')}>По нажатию произойдет сохранение данных или файла</p>
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
        <Button label="Искать" />
        <p className={cnExample('Status', { view: 'wrong' })}>Неправильно</p>
      </div>
      <div className={cnExample()}>
        <Button label="Найти" />
        <p className={cnExample('Status', { view: 'right' })}>Правильно</p>
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
        <Button label="Редактировать" />
        <p className={cnExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </div>
  );
}
