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
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={[
        {
          label: 'Неправильно',
          description:
            'Непонятно, что будет, если нажать на кнопку. Скорее всего, ничего, но это не точно.',
          status: 'error',
          node: (
            <div>
              <Text className={cnMixSpace({ mB: 'm' })}>
                Ракета к запуску готова.
              </Text>
              <Button label="OK" />
            </div>
          ),
        },
        {
          label: 'Правильно',
          description:
            'Понятно, что если нажать на кнопку, ракета отправится в полёт.',
          status: 'success',
          node: (
            <div>
              <Text className={cnMixSpace({ mB: 'm' })}>
                Ракета к запуску готова.
              </Text>
              <Button label="Запустить" />
            </div>
          ),
        },
      ]}
    />
  );
};

export const ButtonExampleNameVerb = () => {
  return (
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={[
        {
          label: 'Неправильно',
          description: 'Предлагаем поискать, но результат не гарантируем.',
          status: 'error',
          node: (
            <div style={{ display: 'flex', gap: 'var(--space-l)' }}>
              <Button label="Поиск" />
              <Button label="Искать" />
            </div>
          ),
        },
        {
          label: 'Правильно',
          description:
            'Внимание на результат: обязательно найдём то, что вы ищете.',
          status: 'success',
          node: <Button label="Найти" />,
        },
      ]}
    />
  );
};

export const ButtonExampleNameSingleLine = () => {
  return (
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={[
        {
          label: 'Неправильно',
          status: 'error',
          node: (
            <Button
              label="Скачать файл презентации"
              style={{ width: '200px', whiteSpace: 'normal', height: 'auto' }}
            />
          ),
        },
        {
          label: 'Правильно',
          status: 'success',
          node: <Button label="Скачать" />,
        },
      ]}
    />
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
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={[
        {
          label: 'Неправильно',
          status: 'error',
          node: <Button label="Отредактировать больничный лист" />,
        },
        {
          label: 'Неправильно',
          status: 'error',
          node: (
            <Button
              label="Отредактировать больничный лист"
              style={{ width: '240px' }}
            />
          ),
        },
        {
          label: 'Правильно',
          status: 'success',
          node: (
            <>
              <Text
                className={cnMixSpace({ mB: 'm' })}
                size="l"
                weight="bold"
                lineHeight="l"
              >
                Больничный лист
              </Text>
              <Button label="Редактировать" size="s" />
            </>
          ),
        },
        {
          label: 'Правильно',
          status: 'success',
          node: (
            <>
              <Text
                className={cnMixSpace({ mB: 'm' })}
                size="l"
                weight="bold"
                lineHeight="l"
              >
                Больничный лист
              </Text>
              <Button
                label="Редактировать"
                iconRight={IconEdit}
                size="s"
                iconSize="s"
                onlyIcon
              />
            </>
          ),
        },
      ]}
    />
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
    <Example col={{ 1: 0, 2: 800 }} separately>
      <div>
        <Text className={cnMixSpace({ mB: 'm' })}>
          Мы используем куки! Без них всё сломается :(
        </Text>
        <Button label="Понятно" />
      </div>
      <div>
        <Text className={cnMixSpace({ mB: 'm' })}>
          Примите лиценизонное соглашение, ну пожалуйста.
        </Text>
        <Button label="Принимаю" />
      </div>
    </Example>
  );
};
