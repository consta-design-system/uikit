import './ReposData.css';

import React from 'react';

import { Badge } from '../../../../../src/components/Badge/Badge';
import { Text } from '../../../../../src/components/Text/Text';
import { cnDocsDecorator } from '../../../../../src/uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../src/uiKit/whitepaper/whitepaper';
import { cn } from '../../../../../src/utils/bem';

const cnReposData = cn('ReposData');

export const ReposDataBase = () => {
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
          <Text
            as="a"
            view="link"
            size="s"
            href="https://github.com/consta-design-system/uikit"
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
            Документация и стенд
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
          Диаграммы и графики из библиотеки{' '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://g2plot.antv.vision/en"
            target="_blank"
          >
            G2Plot
          </Text>{' '}
          с тематизацией для Consta.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/consta-design-system/charts"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://consta-charts.vercel.app/"
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
          помощью которых удобно показывать статистику. Библиотека сделана на основе{' '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://d3js.org/"
            target="_blank"
          >
            D3.js
          </Text>{' '}
          .
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/consta-design-system/widgets"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://consta-widgets.consta.vercel.app/"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
    </div>
  );
};

export const ReposDataSingleComponents = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div
          className={cnDocsDecorator('Section', [
            wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
          ])}
        >
          <div className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text weight="bold" size="l">
              Header
            </Text>
          </div>
          <div
            className={
              ([wp.tplGrid('fraction', { row: 'third' })], [wp.decorator({ distribute: 'right' })])
            }
          >
            <Badge label="В работе" size="s" status="system" />
          </div>
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
            href="https://github.com/consta-design-system/header"
            target="_blank"
          >
            GitHub
          </Text>
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text weight="bold" size="l">
          Stats
        </Text>
        <Text className="ReposDataText">
          Компонент для отображения чисел, с заголовком, единицами измерения, иконками и другими
          настройками.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/consta-design-system/stats"
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
            href="https://github.com/consta-design-system/analytic-ui"
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
            href="https://github.com/consta-design-system/gpn-responses"
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

export const ReposDataAdapters = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div>
          <Text weight="bold" size="l">
            rc-table-adapter
          </Text>
        </div>
        <Text className="ReposDataText">
          Адаптер для{' '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/react-component/table"
            target="_blank"
          >
            rc-table
          </Text>
          . Таблица со множеством настроек.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/consta-design-system/rc-table-adapter"
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
          rc-tree-adapter
        </Text>
        <Text className="ReposDataText">
          Адаптер для{' '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/react-component/tree"
            target="_blank"
          >
            rc-tree
          </Text>
          . Дерево, подходит для создания иерархических структур.
        </Text>
        <Text>
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://github.com/consta-design-system/rc-tree-adapter"
            target="_blank"
          >
            GitHub
          </Text>
          {' | '}
          <Text
            className={cnReposData('Link')}
            as="a"
            view="link"
            href="https://consta-tree.vercel.app/"
            target="_blank"
          >
            Документация
          </Text>
        </Text>
      </div>
    </div>
  );
};

export const ReposDataTemplates = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div>
          <Text weight="bold" size="l">
            simple-template
          </Text>
        </div>
        <Text className="ReposDataText">Архетип простого приложения.</Text>
        <Text
          className={cnReposData('Link')}
          as="a"
          view="link"
          href="https://github.com/consta-design-system/simple-template"
          target="_blank"
        >
          GitHub
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div>
          <Text weight="bold" size="l">
            portal-template
          </Text>
        </div>
        <Text className="ReposDataText">Портальный архетип приложения.</Text>
        <Text
          className={cnReposData('Link')}
          as="a"
          view="link"
          href="https://github.com/consta-design-system/portal-template"
          target="_blank"
        >
          GitHub
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div>
          <Text weight="bold" size="l">
            portal-template-context
          </Text>
        </div>
        <Text className="ReposDataText">
          Портальный архетип приложения с контекстной зависимостью.
        </Text>
        <Text
          className={cnReposData('Link')}
          as="a"
          view="link"
          href="https://github.com/consta-design-system/portal-template-context"
          target="_blank"
        >
          GitHub
        </Text>
      </div>
    </div>
  );
};
