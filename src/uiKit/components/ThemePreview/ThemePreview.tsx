import React, { useState } from 'react';

import { Item, SnackBar } from '../../../components/SnackBar/SnackBar';
import { Text } from '../../../components/Text/Text';
import { defaultVars } from '../../../hooks/useThemeVars/helpers';
import { useThemeVars } from '../../../hooks/useThemeVars/useThemeVars';
import * as wp from '../../whitepaper/whitepaper';
import { ColorPreview } from '../ColorPreview/ColorPreview';

const varsMap = {
  color: {
    primary: defaultVars.color.primary,
    accent: [],
    invert: [],
  },
  control: [],
  font: [],
  size: [],
  space: [],
} as const;

export const ThemePreview: React.FC = () => {
  const [copiedItems, setCopiedItems] = useState<Item[]>([]);

  const clickHandlerCallback = () => {
    setCopiedItems([
      ...copiedItems,
      {
        key: copiedItems.length + 1,
        message: 'Значение скопировано в буфер обмена',
        status: 'system',
        autoClose: 3,
        onAutoClose: () => {
          setCopiedItems(
            copiedItems.length === 1
              ? []
              : [...copiedItems.filter((item) => copiedItems.length + 1 !== item.key)],
          );
        },
      },
    ]);
  };

  const vars = useThemeVars({
    vars: varsMap,
  });
  const primaryColors = vars.color.primary;

  const bgColors = [
    {
      color: '--color-bg-default',
      value: primaryColors['--color-bg-default'],
      description: 'Базовый (основной) цвет фона',
    },
    {
      color: '--color-bg-secondary',
      value: primaryColors['--color-bg-secondary'],
      description: 'Дополнительный (второстепенный) цвет фона',
    },
    {
      color: '--color-bg-brand',
      value: primaryColors['--color-bg-brand'],
      description: 'Цвет фона для брендовых блоков',
    },
    {
      color: '--color-bg-link',
      value: primaryColors['--color-bg-link'],
      description: 'Цвет фона для ссылочных или CTA блоков',
    },
    {
      color: '--color-bg-ghost',
      value: primaryColors['--color-bg-ghost'],
      description:
        'Полупрозрачный цвет для дополнительного выделения или разделения блоков или секций. Обычно используется поверх основных фонов (default или secondary)',
    },
    {
      color: '--color-bg-stripe',
      value: primaryColors['--color-bg-stripe'],
      description: 'Цвет для едва заметного разделения, например чтобы разделить строки в таблицах',
    },
    {
      color: '--color-bg-border',
      value: primaryColors['--color-bg-border'],
      description: 'Цвет большинства бордеров и тонких разделителей',
    },
    {
      color: '--color-bg-system',
      value: primaryColors['--color-bg-system'],
      description: 'Цвет для фона системных сообщений, состояний, уведомлений, и прочего',
    },
    {
      color: '--color-bg-tone',
      value: primaryColors['--color-bg-tone'],
      description: 'Тёмный цвет подложки (оверлея) под высплывающими окнами',
    },
    {
      color: '--color-bg-soft',
      value: primaryColors['--color-bg-soft'],
      description: 'Светлый цвет подложки (оверлея) под высплывающими окнами',
    },
    {
      color: '--color-bg-normal',
      value: primaryColors['--color-bg-normal'],
      description: 'Цвет фона для блоков, сообщающих об нормальном (нейтральном) состоянии системы',
    },
    {
      color: '--color-bg-success',
      value: primaryColors['--color-bg-success'],
      description: 'Цвет фона для блоков, сообщающих об успешном действии/статусе',
    },
    {
      color: '--color-bg-caution',
      value: primaryColors['--color-bg-caution'],
      description: 'Цвет фона для блоков, сообщающих об осторожном действии/статусе',
    },
    {
      color: '--color-bg-warning',
      value: primaryColors['--color-bg-warning'],
      description: 'Цвет фона для блоков, сообщающих об предупреждающем действии/статусе',
    },
    {
      color: '--color-bg-alert',
      value: primaryColors['--color-bg-alert'],
      description: 'Цвет фона для блоков, сообщающих об опасном (ошибочном) действии/статусе',
    },
    {
      color: '--color-bg-critical',
      value: primaryColors['--color-bg-critical'],
      description: 'Цвет фона для блоков, сообщающих об критичном действии/статусе',
    },
    {
      color: '--color-nums-shadow',
      value: primaryColors['--color-nums-shadow'],
      description:
        'Цвет теней, который содержит в себе конкретные цифры из rgb и может быть использован только в конструкциях типа rgba( var(--color-nums-shadow), 0.5 ) Значение альфа-канала описывается отдельно в каждом отдельном случае',
    },
  ];

  const typoColors = [
    {
      color: '--color-typo-primary',
      value: primaryColors['--color-typo-primary'],
      description: 'Основной текст',
    },
    {
      color: '--color-typo-secondary',
      value: primaryColors['--color-typo-secondary'],
      description: 'Второстепенный текст',
    },
    {
      color: '--color-typo-brand',
      value: primaryColors['--color-typo-brand'],
      description: 'Брендовый текст',
    },
    {
      color: '--color-typo-ghost',
      value: primaryColors['--color-typo-ghost'],
      description: 'Третьестепенный текст',
    },
    {
      color: '--color-typo-link',
      value: primaryColors['--color-typo-link'],
      description: 'Ссылка',
    },
    {
      color: '--color-typo-link-hover',
      value: primaryColors['--color-typo-link-hover'],
      description: 'При наведении на ссылку',
    },
    {
      color: '--color-typo-link-minor',
      value: primaryColors['--color-typo-link-minor'],
      description: 'Второстепенная ссылка',
    },
    {
      color: '--color-typo-system',
      value: primaryColors['--color-typo-system'],
      description: 'Для системных сообщений, состояний, уведомлений',
    },
    {
      color: '--color-typo-normal',
      value: primaryColors['--color-typo-normal'],
      description: 'Текст, сообщающий о нормальном (нейтральном) состоянии системы',
    },
    {
      color: '--color-typo-success',
      value: primaryColors['--color-typo-success'],
      description: 'Текст об успехе',
    },
    {
      color: '--color-typo-caution',
      value: primaryColors['--color-typo-caution'],
      description: 'Осторожный текст',
    },
    {
      color: '--color-typo-warning',
      value: primaryColors['--color-typo-warning'],
      description: 'Предупреждающий текст',
    },
    {
      color: '--color-typo-alert',
      value: primaryColors['--color-typo-alert'],
      description: 'Текст об ошибке',
    },
    {
      color: '--color-typo-critical',
      value: primaryColors['--color-typo-critical'],
      description: 'Сообщения критического характера',
    },
  ];

  const scrollbarColors = [
    {
      color: '--color-scroll-bg',
      value: primaryColors['--color-scroll-bg'],
      description: 'Цвет фонового трека',
    },
    {
      color: '--color-scroll-thumb',
      value: primaryColors['--color-scroll-thumb'],
      description: 'Цвет ползунка',
    },
    {
      color: '--color-scroll-thumb-hover',
      value: primaryColors['--color-scroll-thumb-hover'],
      description: 'Цвет ползунка по наведению',
    },
  ];

  const defaultControls = [
    {
      color: '--color-control-bg-default',
      value: primaryColors['--color-control-bg-default'],
      description: 'Фоновый цвет',
    },
    {
      color: '--color-control-typo-default',
      value: primaryColors['--color-control-typo-default'],
      description: 'Цвет текста',
    },
    {
      color: '--color-control-typo-placeholder',
      value: primaryColors['--color-control-typo-placeholder'],
      description: 'Цвет плейсхолдера',
    },
    {
      color: '--color-control-bg-border-default',
      value: primaryColors['--color-control-bg-border-default'],
      description: 'Цвет бордеров',
    },
    {
      color: '--color-control-bg-border-default-hover',
      value: primaryColors['--color-control-bg-border-default-hover'],
      description: 'Цвет бордеров по наведению',
    },
    {
      color: '--color-control-bg-border-focus',
      value: primaryColors['--color-control-bg-border-focus'],
      description: 'Цвет бордеров в состоянии фокуса',
    },
    {
      color: '--color-control-bg-focus',
      value: primaryColors['--color-control-bg-focus'],
      description: 'Цвет тени в состонии фокуса',
    },
    {
      color: '--color-control-bg-active',
      value: primaryColors['--color-control-bg-active'],
      description: 'Цвет тени в состонии нажатия',
    },
  ];

  const primaryControls = [
    {
      color: '--color-control-bg-primary',
      value: primaryColors['--color-control-bg-primary'],
      description: 'Фоновый цвет',
    },
    {
      color: '--color-control-bg-primary-hover',
      value: primaryColors['--color-control-bg-primary-hover'],
      description: 'Фоновый цвет по наведению',
    },
    {
      color: '--color-control-typo-primary',
      value: primaryColors['--color-control-typo-primary'],
      description: 'Цвет текста',
    },
    {
      color: '--color-control-typo-primary-hover',
      value: primaryColors['--color-control-typo-primary-hover'],
      description: 'Цвет текста по наведению',
    },
  ];

  const secondaryControls = [
    {
      color: '--color-control-bg-secondary',
      value: primaryColors['--color-control-bg-secondary'],
      description: 'Фоновый цвет',
    },
    {
      color: '--color-control-typo-secondary',
      value: primaryColors['--color-control-typo-secondary'],
      description: 'Цвет текста',
    },
    {
      color: '--color-control-typo-secondary-hover',
      value: primaryColors['--color-control-typo-secondary-hover'],
      description: 'Цвет текста по наведению',
    },
    {
      color: '--color-control-bg-border-secondary',
      value: primaryColors['--color-control-bg-border-secondary'],
      description: 'Цвет бордеров',
    },
    {
      color: '--color-control-bg-border-secondary-hover',
      value: primaryColors['--color-control-bg-border-secondary-hover'],
      description: 'Цвет бордеров по наведению',
    },
  ];

  const ghostControls = [
    {
      color: '--color-control-bg-ghost',
      value: primaryColors['--color-control-bg-ghost'],
      description: 'Фоновый цвет',
    },
    {
      color: '--color-control-bg-ghost-hover',
      value: primaryColors['--color-control-bg-ghost-hover'],
      description: 'Фоновый цвет по наведению',
    },
    {
      color: '--color-control-typo-ghost',
      value: primaryColors['--color-control-typo-ghost'],
      description: 'Цвет текста',
    },
    {
      color: '--color-control-typo-ghost-hover',
      value: primaryColors['--color-control-typo-ghost-hover'],
      description: 'Цвет текста по наведению',
    },
  ];

  const clearControls = [
    {
      color: '--color-control-bg-clear',
      value: primaryColors['--color-control-bg-clear'],
      description: 'Фоновый цвет',
    },
    {
      color: '--color-control-bg-clear-hover',
      value: primaryColors['--color-control-bg-clear-hover'],
      description: 'Фоновый цвет по наведению',
    },
    {
      color: '--color-control-typo-clear',
      value: primaryColors['--color-control-typo-clear'],
      description: 'Цвет текста',
    },
    {
      color: '--color-control-typo-clear-hover',
      value: primaryColors['--color-control-typo-clear-hover'],
      description: 'Цвет текста по наведению',
    },
  ];

  const disableControls = [
    {
      color: '--color-control-bg-disable',
      value: primaryColors['--color-control-bg-disable'],
      description: 'Фоновый цвет',
    },
    {
      color: '--color-control-typo-disable',
      value: primaryColors['--color-control-typo-disable'],
      description: 'Цвет текста',
    },
    {
      color: '--color-control-bg-border-disable',
      value: primaryColors['--color-control-bg-border-disable'],
      description: 'Цвет бордеров',
    },
  ];

  return (
    <div className={wp.layout()}>
      <SnackBar items={copiedItems} />
      <div className={wp.layout('content')}>
        <div className={wp.layout('container', { size: 'm' })}>
          <section>
            <Text
              as="h2"
              size="xl"
              view="primary"
              weight="bold"
              className={wp.decorator({ 'indent-b': '3xl' })}
            >
              Цвета фонов
            </Text>
            <div
              className={wp.tplGrid({ 's-ratio': '1-1-1', 'col-gap': 'full', 'row-gap': 'full' })}
            >
              {bgColors.map((item, index) => {
                return (
                  <ColorPreview
                    value={item.value}
                    color={item.color}
                    description={item.description}
                    key={index}
                    clickHandler={clickHandlerCallback}
                  />
                );
              })}
            </div>
          </section>

          <section>
            <Text
              as="h2"
              size="xl"
              view="primary"
              weight="bold"
              className={wp.decorator({ 'indent-b': '3xl' })}
            >
              Цвета типографики
            </Text>

            <div
              className={wp.tplGrid({ 's-ratio': '1-1-1', 'col-gap': 'full', 'row-gap': 'full' })}
            >
              {typoColors.map((item, index) => {
                return (
                  <ColorPreview
                    value={item.value}
                    color={item.color}
                    description={item.description}
                    key={index}
                    clickHandler={clickHandlerCallback}
                  />
                );
              })}
            </div>
          </section>

          <section>
            <Text
              as="h2"
              size="xl"
              view="primary"
              weight="bold"
              className={wp.decorator({ 'indent-b': '3xl', 'decorator_indent-t': '6xl' })}
            >
              Цвета скроллбара
            </Text>
            <div
              className={wp.tplGrid({ 's-ratio': '1-1-1', 'col-gap': 'full', 'row-gap': 'full' })}
            >
              {scrollbarColors.map((item, index) => {
                return (
                  <ColorPreview
                    value={item.value}
                    color={item.color}
                    description={item.description}
                    key={index}
                    clickHandler={clickHandlerCallback}
                  />
                );
              })}
            </div>
          </section>

          <section>
            <Text
              as="h2"
              size="xl"
              view="primary"
              weight="bold"
              className={wp.decorator({ 'indent-b': '3xl', 'decorator_indent-t': '6xl' })}
            >
              Цвета контролов
            </Text>
            <div
              className={wp.tplGrid({ 's-ratio': '1-1-1', 'col-gap': 'full', 'row-gap': 'full' })}
            >
              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Default
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для большинства нейтральных контролов
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {defaultControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={item.value}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Primary
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для акцентных контролов и состояний
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {primaryControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={item.value}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Secondary
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для второстепенных контролов (преимущественно кнопки)
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {secondaryControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={item.value}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Ghost
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для третьестепенных контролов, часто идущих в паре с Primary
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {ghostControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={item.value}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Clear
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для «невидимых» контролов (примущественно кнопки без явной границы)
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {clearControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={item.value}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Disable
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для недоступных контролов
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {disableControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={item.value}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ColorPreview;
