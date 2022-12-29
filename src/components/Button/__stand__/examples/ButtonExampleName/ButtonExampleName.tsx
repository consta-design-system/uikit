import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import { IconEdit } from '@consta/icons/IconEdit';
import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cnDocsExample } from '##/uiKit/components/DocsExample';

export const ButtonExampleNameSemantics = () => {
  return (
    <Example col={{ 1: 0, 2: 800 }}>
      <div>
        <p className={cnDocsExample('Caption')}>Ракета к запуску готова.</p>
        <Button label="OK" />
        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
        <p className={cnDocsExample('Subscription')}>
          Непонятно, что будет, если нажать на кнопку. Скорее всего, ничего, но
          это не точно.
        </p>
      </div>
      <div>
        <p className={cnDocsExample('Caption')}>Ракета к запуску готова.</p>
        <Button label="Запустить" />
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
        <p className={cnDocsExample('Subscription')}>
          Понятно, что если нажать на кнопку, ракета отправится в полёт.
        </p>
      </div>
    </Example>
  );
};

export const ButtonExampleNameVerb = () => {
  return (
    <Example col={{ 1: 0, 2: 800 }}>
      <div>
        <div style={{ display: 'flex', gap: 'var(--space-l)' }}>
          <Button label="Поиск" />
          <Button label="Искать" />
        </div>
        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
        <p className={cnDocsExample('Subscription')}>
          Предлагаем поискать, но результат не гарантируем.
        </p>
      </div>
      <div>
        <Button label="Найти" />
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
        <p className={cnDocsExample('Subscription')}>
          Внимание на результат: обязательно найдём то, что вы ищете.
        </p>
      </div>
    </Example>
  );
};

export const ButtonExampleNameSingleLine = () => {
  return (
    <Example col={{ 1: 0, 2: 800 }}>
      <div>
        <Button
          label="Скачать файл презентации"
          style={{ width: '200px', whiteSpace: 'normal', height: 'auto' }}
        />
        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
      </div>
      <div>
        <Button label="Скачать" className={cnMixSpace({ mB: '3xl' })} />
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </Example>
  );
};

export const ButtonExampleNameOverflow = () => {
  return (
    <Example>
      <div>
        <Button label="Редактировать" style={{ width: '130px' }} />
        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
      </div>
      <div>
        <div>
          <Button label="Редактировать" />
          <Button
            label="Редактировать"
            iconRight={IconEdit}
            iconSize="s"
            onlyIcon
          />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </Example>
  );
};

export const ButtonExampleNameTooBig = () => {
  return (
    <Example col={{ 1: 0, 2: 800 }}>
      <div className={cnDocsExample()}>
        <Button label="Отредактировать больничный лист" />
      </div>
      <div className={cnDocsExample()}>
        <Button
          label="Отредактировать больничный лист"
          style={{ width: '240px' }}
        />
        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
      </div>
      <div className={cnDocsExample()}>
        <div>
          <Text size="l" weight="bold" lineHeight="l">
            Больничный лист
          </Text>
          <Button label="Редактировать" size="s" />
        </div>
      </div>
      <div className={cnDocsExample()}>
        <div>
          <Text size="l" weight="bold" lineHeight="l">
            Больничный лист
          </Text>
          <Button
            label="Редактировать"
            iconRight={IconEdit}
            size="s"
            iconSize="s"
            onlyIcon
          />
        </div>
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </Example>
  );
};

export const ButtonExampleNameNavigation = () => {
  return (
    <Example>
      <Button label="Назад" iconLeft={IconArrowLeft} />
      <Button label="Вперёд" iconRight={IconArrowRight} />
    </Example>
  );
};

export const ButtonExampleNameAgreement = () => {
  return (
    <Example>
      <div>
        <p className={cnDocsExample('Caption')}>
          Мы используем куки! Без них всё сломается :(
        </p>
        <Button label="Понятно" />
      </div>
      <div>
        <p className={cnDocsExample('Caption')}>
          Примите лиценизонное соглашение, ну пожалуйста.
        </p>
        <Button label="Принимаю" />
      </div>
    </Example>
  );
};
