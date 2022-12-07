import { Example } from '@consta/stand';
import React from 'react';

import { IconAdd } from '##/icons/IconAdd';
import { IconBookmarkStroked } from '##/icons/IconBookmarkStroked';
import { IconChatStroked as IconChat } from '##/icons/IconChatStroked';
import { IconCopy } from '##/icons/IconCopy';
import { IconEdit } from '##/icons/IconEdit';
import { IconForward } from '##/icons/IconForward';
import { IconFunnel } from '##/icons/IconFunnel';
import { IconSettings } from '##/icons/IconSettings';

import { Button } from '../../../Button';

export const ButtonExampleViewPrimary = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <Button label="Войти" />
      <Button label="Продолжить" iconRight={IconForward} />
      <Button label="Добавить" iconRight={IconAdd} onlyIcon />
    </Example>
  );
};

export const ButtonExampleViewSecondary = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <Button view="secondary" label="Читать далее" />
      <Button view="secondary" label="Комментировать" iconLeft={IconChat} />
      <Button
        view="secondary"
        label="Редактировать"
        iconRight={IconEdit}
        onlyIcon
      />
    </Example>
  );
};

export const ButtonExampleViewGhost = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <Button view="ghost" label="Отмена" />
      <Button view="ghost" label="Настройки" iconLeft={IconSettings} />
      <Button view="ghost" label="Фильтр" iconLeft={IconFunnel} onlyIcon />
    </Example>
  );
};

export const ButtonExampleViewClear = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <Button view="clear" label="Развернуть" />
      <Button view="clear" label="Скопировать" iconLeft={IconCopy} />
      <Button
        view="clear"
        label="Добавить в Избранное"
        iconLeft={IconBookmarkStroked}
        onlyIcon
      />
    </Example>
  );
};

export const ButtonExampleViewDisabled = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <Button disabled label="Войти" />
      <Button disabled label="Продолжить" iconRight={IconForward} />
      <Button disabled label="Добавить" iconRight={IconAdd} onlyIcon />
    </Example>
  );
};
