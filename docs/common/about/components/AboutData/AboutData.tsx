import './AboutData.css';

import React from 'react';

// import { Badge } from '../../../../../src/components/Badge/Badge';
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
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <div>
          <Text weight="bold" size="l">
            Основное
          </Text>
        </div>
        <ul>
          <li>
            <Text as="a" view="link" size="xs" href="/?path=/docs/components-text--playground">
              типографика
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="/?path=/story/components-theme--playground"
            >
              цвета
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="/?path=/story/components-icons--playground"
            >
              иконки
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="/?path=/docs/thematization-what-are-themes--page"
            >
              темы
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="/?path=/docs/common-preview--page"
            >
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
        <ul>
          <li>
            <Text as="a" view="link" size="xs" href="/?path=/docs/common-start--page">
              быстрый старт
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="/?path=/docs/common-about-figma--page"
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
              href="/?path=/docs/common-about-github--page"
              target="_blank"
            >
              библиотеки для разработки
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="/?path=/docs/common-workflow--page"
              target="_blank"
            >
              как работать с дизайн-системой
            </Text>
          </li>
        </ul>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <div>
          <Text weight="bold" size="l">
            Обновления и контакты
          </Text>
        </div>
        <ul>
          <li>
            <Text as="a" view="link" size="xs" href="https://consta.design/" target="_blank">
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
        <ul>
          <li>
            <Text as="a" view="link" size="xs" href="/?path=/docs/common-design-contributors--page">
              дизайнерам
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="/?path=/docs/common-develop-contributors--page"
            >
              разработчикам
            </Text>
          </li>
          <li>
            <Text
              className={cnAboutData('Link')}
              as="a"
              view="link"
              href="/?path=/docs/common-addcomponent--page"
            >
              как добавить компонент
            </Text>
          </li>
        </ul>
      </div>
    </div>
  );
};
