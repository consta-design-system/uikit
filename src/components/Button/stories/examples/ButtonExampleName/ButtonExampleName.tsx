import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../Button';

const cnDocs = cn('StoryBookRootDocsDecorator');
const cnExample = cn('Example');

export function ButtonExampleName1() {
  return (
    <div className={cnDocs('Section', ['tpl-grid tpl-grid_ratio_1-1 tpl-grid_col-gap_full'])}>
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

export function ButtonExampleName2() {
  return (
    <div className={cnDocs('Section', ['tpl-grid tpl-grid_ratio_1-1 tpl-grid_col-gap_full'])}>
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

export function ButtonExampleName3() {
  return (
    <div className={cnDocs('Section', ['tpl-grid tpl-grid_ratio_1-1 tpl-grid_col-gap_full'])}>
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

export function ButtonExampleName4() {
  return (
    <div className={cnDocs('Section', ['tpl-grid tpl-grid_ratio_1-1 tpl-grid_col-gap_full'])}>
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
