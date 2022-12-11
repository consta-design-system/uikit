import './ButtonExampleView.css';

import { IconAdd } from '@consta/icons/IconAdd';
import { IconBookmarkStroked } from '@consta/icons/IconBookmarkStroked';
import { IconChatStroked as IconChat } from '@consta/icons/IconChatStroked';
import { IconCopy } from '@consta/icons/IconCopy';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconForward } from '@consta/icons/IconForward';
import { IconFunnel } from '@consta/icons/IconFunnel';
import { IconSettings } from '@consta/icons/IconSettings';
import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Button } from '../../../Button';

const cnButtonExampleView = cn('ButtonExampleView');

export const ButtonExampleViewPrimary = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
        cnButtonExampleView(),
      ])}
    >
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
};

export const ButtonExampleViewSecondary = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
        cnButtonExampleView(),
      ])}
    >
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="secondary" label="Читать далее" />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="secondary" label="Комментировать" iconLeft={IconChat} />
      </div>
      <div className={cnDocsExample()}>
        <Button
          view="secondary"
          label="Редактировать"
          iconRight={IconEdit}
          onlyIcon
        />
      </div>
    </div>
  );
};

export const ButtonExampleViewGhost = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
        cnButtonExampleView(),
      ])}
    >
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
};

export const ButtonExampleViewClear = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
        cnButtonExampleView(),
      ])}
    >
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="clear" label="Развернуть" />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button view="clear" label="Скопировать" iconLeft={IconCopy} />
      </div>
      <div className={cnDocsExample()}>
        <Button
          view="clear"
          label="Добавить в Избранное"
          iconLeft={IconBookmarkStroked}
          onlyIcon
        />
      </div>
    </div>
  );
};

export const ButtonExampleViewDisabled = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
        cnButtonExampleView(),
      ])}
    >
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
};
