import React from 'react';

import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { IconBookmarkStroked } from '../../../../../icons/IconBookmarkStroked/IconBookmarkStroked';
import { IconChat } from '../../../../../icons/IconChat/IconChat';
import { IconCopy } from '../../../../../icons/IconCopy/IconCopy';
import { IconEdit } from '../../../../../icons/IconEdit/IconEdit';
import { IconForward } from '../../../../../icons/IconForward/IconForward';
import { IconFunnel } from '../../../../../icons/IconFunnel/IconFunnel';
import { IconSettings } from '../../../../../icons/IconSettings/IconSettings';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Button } from '../../../Button';

export function ButtonExampleViewPrimary() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Войти" />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Продолжить" iconRight={IconForward} />
      </div>
      <div className={cnDocsExample()}>
        <Button label="Добавить" iconRight={IconAdd} onlyIcon />
      </div>
    </div>
  );
}

export function ButtonExampleViewSecondary() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="secondary" label="Читать далее" />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="secondary" label="Комментировать" iconLeft={IconChat} />
      </div>
      <div className={cnDocsExample()}>
        <Button view="secondary" label="Редактировать" iconRight={IconEdit} onlyIcon />
      </div>
    </div>
  );
}

export function ButtonExampleViewGhost() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="ghost" label="Отмена" />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="ghost" label="Настройки" iconLeft={IconSettings} />
      </div>
      <div className={cnDocsExample()}>
        <Button view="ghost" label="Фильтр" iconLeft={IconFunnel} onlyIcon />
      </div>
    </div>
  );
}

export function ButtonExampleViewClear() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="clear" label="Развернуть" />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="clear" label="Скопировать" iconLeft={IconCopy} />
      </div>
      <div className={cnDocsExample()}>
        <Button view="clear" label="Добавить в Избранное" iconLeft={IconBookmarkStroked} onlyIcon />
      </div>
    </div>
  );
}

export function ButtonExampleViewDisabled() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button disabled label="Войти" />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button disabled label="Продолжить" iconRight={IconForward} />
      </div>
      <div className={cnDocsExample()}>
        <Button disabled label="Добавить" iconRight={IconAdd} onlyIcon />
      </div>
    </div>
  );
}
