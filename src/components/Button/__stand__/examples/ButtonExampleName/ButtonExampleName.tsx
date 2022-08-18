import React from 'react';

import { IconArrowLeft } from '../../../../../icons/IconArrowLeft/IconArrowLeft';
import { IconArrowRight } from '../../../../../icons/IconArrowRight/IconArrowRight';
import { IconEdit } from '../../../../../icons/IconEdit/IconEdit';
import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text } from '../../../../Text/Text';
import { Button } from '../../../Button';

export const ButtonExampleNameSemantics = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <p
            className={cnDocsExample('Caption')}
            className={cnMixSpace({ mB: 'm' })}
          >
            Ракета к запуску готова.
          </p>
          <Button label="OK" />
          <p className={cnDocsExample('Status', { view: 'wrong' })}>
            Неправильно
          </p>
          <p className={cnDocsExample('Subscription')}>
            Непонятно, что будет, если нажать на кнопку. Скорее всего, ничего,
            но это не точно.
          </p>
        </div>
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <p
            className={cnDocsExample('Caption')}
            className={cnMixSpace({ mB: 'm' })}
          >
            Ракета к запуску готова.
          </p>
          <Button label="Запустить" />
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
          <p className={cnDocsExample('Subscription')}>
            Понятно, что если нажать на кнопку, ракета отправится в полёт.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ButtonExampleNameVerb = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <div className={wp.decorator({ distribute: 'left' })}>
            <Button
              label="Поиск"
              className={wp.decorator({ 'indent-r': 's' })}
            />
            <Button label="Искать" />
          </div>
          <p className={cnDocsExample('Status', { view: 'wrong' })}>
            Неправильно
          </p>
          <p className={cnDocsExample('Subscription')}>
            Предлагаем поискать, но результат не гарантируем.
          </p>
        </div>
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <Button label="Найти" />
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
          <p className={cnDocsExample('Subscription')}>
            Внимание на результат: обязательно найдём то, что вы ищете.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ButtonExampleNameSingleLine = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <Button
            label="Скачать файл презентации"
            style={{ width: '200px', whiteSpace: 'normal', height: 'auto' }}
          />
          <p className={cnDocsExample('Status', { view: 'wrong' })}>
            Неправильно
          </p>
        </div>
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <Button label="Скачать" className={cnMixSpace({ mB: '3xl' })} />
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
        </div>
      </div>
    </div>
  );
};

export const ButtonExampleNameOverflow = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <Button label="Редактировать" style={{ width: '130px' }} />
          <p className={cnDocsExample('Status', { view: 'wrong' })}>
            Неправильно
          </p>
        </div>
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <div className={wp.decorator({ distribute: 'left' })}>
            <Button
              label="Редактировать"
              className={wp.decorator({ 'indent-r': 's' })}
            />
            <Button
              label="Редактировать"
              iconRight={IconEdit}
              iconSize="s"
              onlyIcon
            />
          </div>
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
        </div>
      </div>
    </div>
  );
};

export const ButtonExampleNameTooBig = () => {
  return (
    <div>
      <div
        className={cnDocsDecorator('Section', [
          wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
        ])}
      >
        <div className={cnMixSpace({ m: 'm', mB: '2xs' })}>
          <div className={cnDocsExample()}>
            <Button label="Отредактировать больничный лист" />
          </div>
        </div>
        <div className={cnMixSpace({ m: 'm', mB: '2xs' })}>
          <div className={cnDocsExample()}>
            <div className={wp.decorator({ distribute: 'left' })}>
              <Text size="l" weight="bold" lineHeight="l">
                Больничный лист
              </Text>
              <Button
                label="Редактировать"
                size="s"
                className={wp.decorator({ 'indent-l': 's' })}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={cnDocsDecorator('Section', [
          wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
        ])}
      >
        <div className={cnMixSpace({ m: 'm', mT: '2xs' })}>
          <div className={cnDocsExample()}>
            <Button
              label="Отредактировать больничный лист"
              style={{ width: '240px' }}
            />
            <p className={cnDocsExample('Status', { view: 'wrong' })}>
              Неправильно
            </p>
          </div>
        </div>
        <div className={cnMixSpace({ m: 'm', mT: '2xs' })}>
          <div className={cnDocsExample()}>
            <div className={wp.decorator({ distribute: 'left' })}>
              <Text size="l" weight="bold" lineHeight="l">
                Больничный лист
              </Text>
              <Button
                label="Редактировать"
                iconRight={IconEdit}
                size="s"
                iconSize="s"
                onlyIcon
                className={wp.decorator({ 'indent-l': 's' })}
              />
            </div>
            <p className={cnDocsExample('Status', { view: 'right' })}>
              Правильно
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ButtonExampleNameNavigation = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div
          className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}
        >
          <Button label="Назад" iconLeft={IconArrowLeft} />
        </div>
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div
          className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}
        >
          <Button label="Вперёд" iconRight={IconArrowRight} />
        </div>
      </div>
    </div>
  );
};

export const ButtonExampleNameAgreement = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            Мы используем куки! Без них всё совсем сломается :(
          </p>
          <Button label="Понятно" />
        </div>
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <p className={cnDocsExample('Caption')}>
            Примите лиценизонное соглашение, ну пожалуйста.
          </p>
          <Button label="Принимаю" />
        </div>
      </div>
    </div>
  );
};
