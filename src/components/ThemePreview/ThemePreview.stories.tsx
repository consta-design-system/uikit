import React from 'react';
import { storiesOf } from '@storybook/react';

import './styles.css';

import ColorPreview from './ColorPreview';

storiesOf('Themes', module).add('Цвета', () => (
  <div className="tpl-layout">
    <div className="tpl-layout__content">
      <div className="tpl-layout__container tpl-layout__container_size_m">
        <section>
          <h2 className="text text_size_4xl text_view_primary text_weight-bold decorator decorator_indent-b_3xl">
            Цвета фонов
          </h2>
          <div className="tpl-grid tpl-grid_s-ratio_1-1-1 tpl-grid_col-gap_full tpl-grid_row-gap_full">
            <ColorPreview
              color={'--color-bg-default'}
              description={'Базовый (основной) цвет фона'}
            />

            <ColorPreview
              color={'--color-bg-secondary'}
              description={'Дополнительный (второстепенный) цвет фона'}
            />

            <ColorPreview
              color={'--color-bg-brand'}
              description={'Цвет фона для брендовых блоков'}
            />

            <ColorPreview
              color={'--color-bg-link'}
              description={'Цвет фона для ссылочных или CTA блоков'}
            />

            <ColorPreview
              color={'--color-bg-ghost'}
              description={
                'Полупрозрачный цвет для дополнительного выделения или разделения блоков или секций. Обычно используется поверх основных фонов (default или secondary)'
              }
            />

            <ColorPreview
              color={'--color-bg-stripe'}
              description={
                'Цвет для едва заметного разделения, например чтобы разделить строки в таблицах'
              }
            />

            <ColorPreview
              color={'--color-bg-border'}
              description={'Цвет большинства бордеров и тонких разделителей'}
            />

            <ColorPreview
              color={'--color-bg-system'}
              description={'Цвет для фона системных сообщений, состояний, уведомлений, и прочего'}
            />

            <ColorPreview
              color={'--color-bg-tone'}
              description={'Тёмный цвет подложки (оверлея) под высплывающими окнами'}
            />

            <ColorPreview
              color={'--color-bg-soft'}
              description={'Светлый цвет подложки (оверлея) под высплывающими окнами'}
            />

            <ColorPreview
              color={'--color-bg-normal'}
              description={
                'Цвет фона для блоков, сообщающих об нормальном (нейтральном) состоянии системы'
              }
            />

            <ColorPreview
              color={'--color-bg-success'}
              description={'Цвет фона для блоков, сообщающих об успешном действии/статусе'}
            />

            <ColorPreview
              color={'--color-bg-caution'}
              description={'Цвет фона для блоков, сообщающих об осторожном действии/статусе'}
            />

            <ColorPreview
              color={'--color-bg-warning'}
              description={'Цвет фона для блоков, сообщающих об предупреждающем действии/статусе'}
            />

            <ColorPreview
              color={'--color-bg-alert'}
              description={
                'Цвет фона для блоков, сообщающих об опасном (ошибочном) действии/статусе'
              }
            />

            <ColorPreview
              color={'--color-bg-critical'}
              description={'Цвет фона для блоков, сообщающих об критичном действии/статусе'}
            />

            <ColorPreview
              color={'--color-nums-shadow'}
              rgba={true}
              description={
                'Цвет теней, который содержит в себе конкретные цифры из rgb и может быть использован только в конструкциях типа rgba( var(--color-nums-shadow), 0.5 ) Значение альфа-канала описывается отдельно в каждом отдельном случае'
              }
            />
          </div>
        </section>

        <section>
          <h2 className="text text_size_4xl text_view_primary text_weight-bold decorator decorator_indent-t_6xl decorator_indent-b_3xl">
            Цвета типографики
          </h2>
          <div className="tpl-grid tpl-grid_s-ratio_1-1-1 tpl-grid_col-gap_full tpl-grid_row-gap_full">
            <ColorPreview
              color={'--color-typo-primary'}
              description={'Базовый (основной) цвет фона'}
            />

            <ColorPreview
              color={'--color-typo-secondary'}
              description={'Дополнительный (второстепенный) цвет фона'}
            />

            <ColorPreview
              color={'--color-typo-brand'}
              description={'Цвет фона для брендовых блоков'}
            />

            <ColorPreview
              color={'--color-typo-ghost'}
              description={'Цвет фона для ссылочных или CTA блоков'}
            />

            <ColorPreview
              color={'--color-typo-link'}
              description={
                'Полупрозрачный цвет для дополнительного выделения или разделения блоков или секций. Обычно используется поверх основных фонов (default или secondary)'
              }
            />

            <ColorPreview
              color={'--color-typo-link-hover'}
              description={
                'Цвет для едва заметного разделения, например чтобы разделить строки в таблицах'
              }
            />

            <ColorPreview
              color={'--color-typo-link-minor'}
              description={'Цвет большинства бордеров и тонких разделителей'}
            />

            <ColorPreview
              color={'--color-typo-system'}
              description={'Цвет для фона системных сообщений, состояний, уведомлений, и прочего'}
            />

            <ColorPreview
              color={'--color-typo-normal'}
              description={
                'Цвет фона для блоков, сообщающих об нормальном (нейтральном) состоянии системы'
              }
            />

            <ColorPreview
              color={'--color-typo-success'}
              description={'Цвет фона для блоков, сообщающих об успешном действии/статусе'}
            />

            <ColorPreview
              color={'--color-typo-caution'}
              description={'Цвет фона для блоков, сообщающих об осторожном действии/статусе'}
            />

            <ColorPreview
              color={'--color-typo-warning'}
              description={'Цвет фона для блоков, сообщающих об предупреждающем действии/статусе'}
            />

            <ColorPreview
              color={'--color-typo-alert'}
              description={
                'Цвет фона для блоков, сообщающих об опасном (ошибочном) действии/статусе'
              }
            />

            <ColorPreview
              color={'--color-typo-critical'}
              description={'Цвет фона для блоков, сообщающих об критичном действии/статусе'}
            />
          </div>
        </section>

        <section>
          <h2 className="text text_size_4xl text_view_primary text_weight-bold decorator decorator_indent-t_6xl decorator_indent-b_3xl">
            Цвета скроллбара
          </h2>
          <div className="tpl-grid tpl-grid_s-ratio_1-1-1 tpl-grid_col-gap_full tpl-grid_row-gap_full">
            <ColorPreview color={'--color-scroll-bg'} description={'Цвет фонового трека'} />
            <ColorPreview color={'--color-scroll-thumb'} description={'Цвет ползунка'} />
            <ColorPreview
              color={'--color-scroll-thumb-hover'}
              description={'Цвет ползунка по наведению'}
            />
          </div>
        </section>

        <section>
          <h2 className="text text_size_4xl text_view_primary text_weight-bold decorator decorator_indent-t_6xl decorator_indent-b_2xl">
            Цвета контролов
          </h2>
          <div className="tpl-grid tpl-grid_s-ratio_1-1 tpl-grid_col-gap_full tpl-grid_row-gap_full">
            <section>
              <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                Default
              </h3>
              <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                Цвета для большинства нейтральных контролов
              </p>
              <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                <ColorPreview color={'--color-control-bg-default'} description={'Фоновый цвет'} />

                <ColorPreview color={'--color-control-typo-default'} description={'Цвет текста'} />

                <ColorPreview
                  color={'--color-control-typo-placeholder'}
                  description={'Цвет плейсхолдера'}
                />

                <ColorPreview
                  color={'--color-control-bg-border-default'}
                  description={'Цвет бордеров'}
                />

                <ColorPreview
                  color={'--color-control-bg-border-default-hover'}
                  description={'Цвет бордеров по наведению'}
                />

                <ColorPreview
                  color={'--color-control-bg-border-focus'}
                  description={'Цвет бордеров в состоянии фокуса'}
                />

                <ColorPreview
                  color={'--color-control-bg-focus'}
                  description={'Цвет тени в состонии фокуса'}
                />
                <ColorPreview
                  color={'--color-control-bg-active'}
                  description={'Цвет тени в состонии нажатия'}
                />
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
                <ColorPreview color={'--color-control-bg-primary'} description={'Фоновый цвет'} />

                <ColorPreview
                  color={'--color-control-bg-primary-hover'}
                  description={'Фоновый цвет по наведению'}
                />

                <ColorPreview color={'--color-control-typo-primary'} description={'Цвет текста'} />

                <ColorPreview
                  color={'--color-control-typo-primary-hover'}
                  description={'Цвет текста по наведению'}
                />
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
                <ColorPreview color={'--color-control-bg-secondary'} description={'Фоновый цвет'} />

                <ColorPreview
                  color={'--color-control-typo-secondary'}
                  description={'Цвет текста'}
                />

                <ColorPreview
                  color={'--color-control-typo-secondary-hover'}
                  description={'Цвет текста по наведению'}
                />

                <ColorPreview
                  color={'--color-control-bg-border-secondary'}
                  description={'Цвет бордеров'}
                />

                <ColorPreview
                  color={'--color-control-bg-border-secondary-hover'}
                  description={'Цвет бордеров по наведению'}
                />
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
                <ColorPreview color={'--color-control-bg-ghost'} description={'Фоновый цвет'} />

                <ColorPreview
                  color={'--color-control-bg-ghost-hover'}
                  description={'Фоновый цвет по наведению'}
                />

                <ColorPreview color={'--color-control-typo-ghost'} description={'Цвет текста'} />

                <ColorPreview
                  color={'--color-control-typo-ghost-hover'}
                  description={'Цвет текста по наведению'}
                />
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
                <ColorPreview color={'--color-control-bg-clear'} description={'Фоновый цвет'} />

                <ColorPreview
                  color={'--color-control-bg-clear-hover'}
                  description={'Фоновый цвет по наведению'}
                />

                <ColorPreview color={'--color-control-typo-clear'} description={'Цвет текста'} />

                <ColorPreview
                  color={'--color-control-typo-clear-hover'}
                  description={'Цвет текста по наведению'}
                />
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
                <ColorPreview color={'--color-control-bg-disable'} description={'Фоновый цвет'} />

                <ColorPreview color={'--color-control-typo-disable'} description={'Цвет текста'} />

                <ColorPreview
                  color={'--color-control-bg-border-disable'}
                  description={'Цвет бордеров'}
                />
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  </div>
));
