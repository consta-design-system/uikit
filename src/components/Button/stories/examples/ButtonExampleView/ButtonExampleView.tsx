import React from 'react';

import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { IconBookmarkStroked } from '../../../../../icons/IconBookmarkStroked/IconBookmarkStroked';
import { IconChat } from '../../../../../icons/IconChat/IconChat';
import { IconCopy } from '../../../../../icons/IconCopy/IconCopy';
import { IconEdit } from '../../../../../icons/IconEdit/IconEdit';
import { IconForward } from '../../../../../icons/IconForward/IconForward';
import { IconFunnel } from '../../../../../icons/IconFunnel/IconFunnel';
import { IconSettings } from '../../../../../icons/IconSettings/IconSettings';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../Button';

const cnDocs = cn('StoryBookRootDocsDecorator');
const cnExample = cn('Example');

export function ButtonExampleView1() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button label="Войти" />
      </div>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button label="Продолжить" iconRight={IconForward} />
      </div>
      <div className={cnExample()}>
        <Button label="Добавить" iconRight={IconAdd} onlyIcon />
      </div>
    </div>
  );
}

export function ButtonExampleView2() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button view="secondary" label="Читать далее" />
      </div>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button view="secondary" label="Комментировать" iconLeft={IconChat} />
      </div>
      <div className={cnExample()}>
        <Button view="secondary" label="Редактировать" iconRight={IconEdit} onlyIcon />
      </div>
    </div>
  );
}

export function ButtonExampleView3() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button view="ghost" label="Отмена" />
      </div>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button view="ghost" label="Настройки" iconLeft={IconSettings} />
      </div>
      <div className={cnExample()}>
        <Button view="ghost" label="Фильтр" iconLeft={IconFunnel} onlyIcon />
      </div>
    </div>
  );
}

export function ButtonExampleView4() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button view="clear" label="Развернуть" />
      </div>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button view="clear" label="Скопировать" iconLeft={IconCopy} />
      </div>
      <div className={cnExample()}>
        <Button view="clear" label="Добавить в Избранное" iconLeft={IconBookmarkStroked} onlyIcon />
      </div>
    </div>
  );
}

export function ButtonExampleView5() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button disabled label="Войти" />
      </div>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button disabled label="Продолжить" iconRight={IconForward} />
      </div>
      <div className={cnExample()}>
        <Button disabled label="Добавить" iconRight={IconAdd} onlyIcon />
      </div>
    </div>
  );
}
