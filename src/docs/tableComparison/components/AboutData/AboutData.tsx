import './AboutData.css';

import React from 'react';

import { cnMixSpace } from '##/mixs/MixSpace/MixSpace';

import { Text } from '../../../../../src/components/Text/Text';
import { cnDocsDecorator } from '../../../../../src/uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../src/uiKit/whitepaper/whitepaper';
import { cn } from '../../../../../src/utils/bem';

const cnAboutData = cn('AboutData');

export const AboutDataGeneral = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      <div
        className={
          (wp.tplGrid('fraction', { row: 'first' }),
          cnMixSpace({ mL: '2xl', mB: 'm' }))
        }
      >
        <div>
          <Text weight="bold" size="l">
            Основное
          </Text>
        </div>
        <ul className={cnMixSpace({ m: 'm', mT: '2xs' })}>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="uikit-components-text-stable"
            >
              типографика
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="uikit-components-theme-stable?hash=цвета-темы-default"
            >
              цвета
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="uikit-components-icon-stable"
            >
              иконки
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="uikit-components-theme-stable"
            >
              темы
            </Text>
          </li>
          <li>
            <Text className={cnAboutData('Link')} as="a" view="link" href="/">
              все компоненты
            </Text>
          </li>
        </ul>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <div>
          <Text weight="bold" size="l">
            С чего начать
          </Text>
        </div>
        <ul className={cnMixSpace({ m: 'm', mT: '2xs' })}>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="uikit-about-start-stable"
            >
              быстрый старт
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="https://www.figma.com/@consta"
              target="_blank"
            >
              библиотеки в Figma
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="https://github.com/consta-design-system"
              target="_blank"
            >
              библиотеки на GitHub
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="uikit-workflow-workflow-stable"
            >
              как работать с дизайн-системой
            </Text>
          </li>
        </ul>
      </div>
      <div
        className={
          (wp.tplGrid('fraction', { row: 'second' }),
          cnMixSpace({ mL: '2xl', mB: 'm' }))
        }
      >
        <div>
          <Text weight="bold" size="l">
            Обновления и контакты
          </Text>
        </div>
        <ul className={cnMixSpace({ m: 'm', mT: '2xs' })}>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="https://consta.design/"
              target="_blank"
            >
              сайт дизайн-системы
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="https://t.me/consta_ui_releases"
              target="_blank"
            >
              канал с обновлениями
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="https://t.me/Consta_Chat"
              target="_blank"
            >
              чат
            </Text>
          </li>
        </ul>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <div>
          <Text weight="bold" size="l">
            Контрибьюторам
          </Text>
        </div>
        <ul className={cnMixSpace({ m: 'm', mT: '2xs' })}>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="uikit-custom-contribute-stable/design"
            >
              дизайнерам
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="uikit-custom-contribute-stable/dev"
            >
              разработчикам
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="uikit-custom-addcomponent-stable"
            >
              как добавить компонент
            </Text>
          </li>
        </ul>
      </div>
    </div>
  );
};
