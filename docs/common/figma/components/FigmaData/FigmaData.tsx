import './FigmaData.css';

import React from 'react';

import { Badge } from '../../../../../src/components/Badge/Badge';
import { Text } from '../../../../../src/components/Text/Text';
import { cnDocsDecorator } from '../../../../../src/uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../src/uiKit/whitepaper/whitepaper';

export const FigmaDataBase = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div
          className={cnDocsDecorator('Section', [
            wp.tplGrid({
              'xs-columns': 2,
              'col-gap': 'full',
              'row-gap': 'full',
            }),
          ])}
        >
          <div className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text
              as="a"
              size="xl"
              weight="bold"
              href="https://www.figma.com/community/file/853774806786762374"
              target="_blank"
              className="FigmaDataLink"
            >
              Consta UI-kit
            </Text>
          </div>
          <div
            className={
              ([wp.tplGrid('fraction', { row: 'third' })],
              [wp.decorator({ distribute: 'right' })])
            }
          >
            <Badge label="Основная" size="s" />
          </div>
        </div>
        <Text className="FigmaDataText">
          Библиотека основных интерфейсных компонентов. В трёх цветовых схемах:
          тёмной, светлой и акцентной.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          weight="bold"
          href="https://www.figma.com/community/file/1045349329378392766"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Components
        </Text>
        <Text className="FigmaDataText">
          Библиотека составных компонентов на базе Consta UI Kit (например, Tree
          и FeedbackForm).
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          weight="bold"
          href="https://www.figma.com/community/file/997586644523081587"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta UI Kit: Best Practices
        </Text>
        <Text className="FigmaDataText">
          Набор рекомендаций, готовых блоков и паттернов для переиспользования,
          созданных на основе Consta UI Kit.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          weight="bold"
          href="https://www.figma.com/community/file/855772200870304447"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Graphics
        </Text>
        <Text className="FigmaDataText">Иконки и иллюстрации.</Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          weight="bold"
          href="https://www.figma.com/community/file/855572288089401017"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Default Colors
        </Text>
        <Text className="FigmaDataText">
          Палитра цветов для основной цветовой схемы Consta UI Kit.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          weight="bold"
          href="https://www.figma.com/community/file/855572445137814202"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Dark Colors
        </Text>
        <Text className="FigmaDataText">
          Палитра цветов для тёмной цветовой схемы Consta UI Kit.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          weight="bold"
          href="https://www.figma.com/community/file/855572769860808379"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Display Colors
        </Text>
        <Text className="FigmaDataText">
          Палитра цветов для акцентной цветовой схемы Consta UI Kit.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          weight="bold"
          href="https://www.figma.com/community/file/855746990421795518"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Default Typography
        </Text>
        <Text className="FigmaDataText">Набор шрифтов для Consta UI Kit.</Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          weight="bold"
          href="https://www.figma.com/community/file/855575974468435644"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Default Spaces
        </Text>
        <Text className="FigmaDataText">Набор отступов для Consta UI Kit.</Text>
      </div>
    </div>
  );
};

export const FigmaDataCharts = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          size="xl"
          weight="bold"
          href="https://www.figma.com/community/file/982611119114314434"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Charts
        </Text>
        <Text className="FigmaDataText">
          Библиотека графиков. В трёх цветовых схемах: тёмной, светлой и
          акцентной.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          size="xl"
          weight="bold"
          href="https://www.figma.com/community/file/1040321919010098028"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Charts Light Colors
        </Text>
        <Text className="FigmaDataText">
          Палитра цветов для библиотеки графиков Consta Charts в светлой
          цветовой схеме.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          size="xl"
          weight="bold"
          href="https://www.figma.com/community/file/1040322030130133869"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Charts Dark Colors
        </Text>
        <Text className="FigmaDataText">
          Палитра цветов для библиотеки графиков Consta Charts в тёмной цветовой
          схеме.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          size="xl"
          weight="bold"
          href="https://www.figma.com/community/file/1063113573061305628"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta Geo-Kit
        </Text>
        <Text className="FigmaDataText">
          Библиотека геологических графиков.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <div
          className={cnDocsDecorator('Section', [
            wp.tplGrid({
              'xs-columns': 2,
              'col-gap': 'full',
              'row-gap': 'full',
            }),
          ])}
        >
          <div className={wp.tplGrid('fraction', { row: 'third' })}>
            <Text
              as="a"
              size="xl"
              weight="bold"
              href="https://www.figma.com/community/file/955853026322123186"
              target="_blank"
              className="FigmaDataLink"
            >
              Consta Widgets
            </Text>
          </div>
          <div
            className={
              ([wp.tplGrid('fraction', { row: 'third' })],
              [wp.decorator({ distribute: 'right' })])
            }
          >
            <Badge label="Не развивается" size="s" status="system" />
          </div>
        </div>
        <Text className="FigmaDataText">
          Библиотека графиков, устаревшая версия. Основная библиотека — Consta
          Charts.
        </Text>
      </div>
    </div>
  );
};

export const FigmaDataMobile = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          size="xl"
          weight="bold"
          href="https://www.figma.com/community/file/1027541533393761291"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta UI Kit: iOS
        </Text>
        <Text className="FigmaDataText">
          Библиотека интерфейсных компонентов для мобильных устройств на iOS.
        </Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'third' })}>
        <Text
          as="a"
          size="xl"
          weight="bold"
          href="https://www.figma.com/community/file/1027541331523291146"
          target="_blank"
          className="FigmaDataLink"
        >
          Consta UI Kit: Android
        </Text>
        <Text className="FigmaDataText">
          Библиотека интерфейсных компонентов для мобильных устройств на
          Android.
        </Text>
      </div>
    </div>
  );
};
