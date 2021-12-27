import './ReposData.css';

import React from 'react';

import { Badge } from '../../../../../src/components/Badge/Badge';
import { Text } from '../../../../../src/components/Text/Text';
import { cnDocsDecorator } from '../../../../../src/uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../src/uiKit/whitepaper/whitepaper';
import { cn } from '../../../../../src/utils/bem';

const cnReposData = cn('ReposData');

export const ReposData1 = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div>
          <Text weight="bold" size="l">
            Consta UI-kit
          </Text>
        </div>
        <Text className="ReposDataText">
          Библиотека интерфейсных компонентов. Основные элементы интерфейса: простые контролы,
          сложные блоки, тематизация, хуки и миксины.
        </Text>
        <Text>
          <Text as="a" view="link" size="s" href="https://g2plot.antv.vision/en" target="_blank">
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://g2plot.antv.vision/en"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div>
          <Text weight="bold" size="l">
            Consta Charts
          </Text>
        </div>
        <Text className="ReposDataText">
          Диаграммы и графики из библиотеки G2Plot с тематизацией для Consta.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/gazprom-neft/consta-uikit"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://consta-uikit.vercel.app/"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div
          className={cnDocsDecorator('Section', [
            wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
          ])}
        >
          <div className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text weight="bold" size="l">
              Consta Widgets
            </Text>
          </div>
          <div
            className={
              ([wp.tplGrid('fraction', { row: 'third' })], [wp.decorator({ distribute: 'right' })])
            }
          >
            <Badge label="Не развивается" size="s" status="system" />
          </div>
        </div>
        <Text className="ReposDataText">
          Библиотека графиков: линейные, столбчатые, круговые диаграммы и другие компоненты, с
          помощью которых удобно показывать статистику. Библиотека сделана на основе D3.js.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://g2plot.antv.vision/en"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://g2plot.antv.vision/en"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
    </div>
  );
};

export const ReposData2 = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div>
          <Text weight="bold" size="l">
            Header
          </Text>
        </div>
        <Text className="ReposDataText">
          Компоненты для создания шапки проекта: логотип, меню, поиск, логин и шапка целиком. Можно
          использовать по отдельности.
        </Text>
        <Text>
          <Text
            as="a"
            view="link"
            size="s"
            href="https://github.com/gazprom-neft/header"
            target="_blank"
          >
            GitHub
          </Text>
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div>
          <Text weight="bold" size="l">
            Table
          </Text>
        </div>
        <Text className="ReposDataText">
          Таблица с гибкими настройками. Компонент взят из библиотеки rc-table и адаптирован для
          Consta.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/gazprom-neft/table"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://consta-table.vercel.app/"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text weight="bold" size="l">
          Tree
        </Text>
        <Text className="ReposDataText">
          Дерево, подходит для создания иерархических структур. Компонент взят из библиотеки rc-tree
          и адаптирован для Consta.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://g2plot.antv.vision/en"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://g2plot.antv.vision/en"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div>
          <Text weight="bold" size="l">
            Table
          </Text>
        </div>
        <Text className="ReposDataText">
          Таблица с гибкими настройками. Компонент взят из библиотеки rc-table и адаптирован для
          Consta.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/gazprom-neft/table"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://consta-table.vercel.app/"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text weight="bold" size="l">
          Stats
        </Text>
        <Text className="ReposDataText">
          Компонент для отображения чисел — с заголовком, единицами измерения, иконками и другими
          настройками.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/gazprom-neft/stats"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="http://stats-consta.vercel.app/"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text weight="bold" size="l">
          Analytic UI
        </Text>
        <Text className="ReposDataText">
          Компоненты для аналитики, пока включает один компонент — форму для оценки и обратной связи
          по методикам NPS и CSI.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/gazprom-neft/analytic-ui"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="http://analytic-ui.vercel.app/"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text weight="bold" size="l">
          GPN-responses
        </Text>
        <Text className="ReposDataText">
          Сообщения об ошибках с иллюстрациями в стиле «Газпром нефти».
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/gazprom-neft/gpn-responses"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="http://gpn-responses.vercel.app/"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
    </div>
  );
};
