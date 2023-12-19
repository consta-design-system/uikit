import './ThemePreview.css';

import React, { useReducer } from 'react';

import { useStyleProps } from '##/hooks/useStyleProps';
import { cnMixSpace } from '##/mixs/MixSpace/MixSpace';

import { SnackBar } from '../../../components/SnackBar/SnackBar';
import { SnackBarItemDefault } from '../../../components/SnackBar/types';
import { Text } from '../../../components/Text/Text';
import { cn } from '../../cn';
import * as wp from '../../whitepaper/whitepaper';
import { ColorPreview } from '../ColorPreview/ColorPreview';
import {
  bgColors,
  clearControls,
  defaultControls,
  disableControls,
  ghostControls,
  primaryControls,
  scrollbarColors,
  secondaryControls,
  typoColors,
} from './helpers';

const cnThemePreview = cn('ThemePreview');

const cssColorVars = [
  '--color-bg-default',
  '--color-bg-secondary',
  '--color-bg-brand',
  '--color-bg-link',
  '--color-bg-border',
  '--color-bg-stripe',
  '--color-bg-ghost',
  '--color-bg-tone',
  '--color-bg-soft',
  '--color-bg-system',
  '--color-bg-normal',
  '--color-bg-success',
  '--color-bg-caution',
  '--color-bg-warning',
  '--color-bg-alert',
  '--color-bg-critical',
  '--color-typo-primary',
  '--color-typo-secondary',
  '--color-typo-ghost',
  '--color-typo-brand',
  '--color-typo-system',
  '--color-typo-normal',
  '--color-typo-success',
  '--color-typo-caution',
  '--color-typo-warning',
  '--color-typo-alert',
  '--color-typo-critical',
  '--color-typo-link',
  '--color-typo-link-minor',
  '--color-typo-link-hover',
  '--color-scroll-bg',
  '--color-scroll-thumb',
  '--color-scroll-thumb-hover',
  '--color-control-bg-default',
  '--color-control-typo-default',
  '--color-control-typo-placeholder',
  '--color-control-bg-border-default',
  '--color-control-bg-border-default-hover',
  '--color-control-bg-border-focus',
  '--color-control-bg-focus',
  '--color-control-bg-active',
  '--color-control-bg-primary',
  '--color-control-bg-primary-hover',
  '--color-control-typo-primary',
  '--color-control-typo-primary-hover',
  '--color-control-bg-secondary',
  '--color-control-bg-border-secondary',
  '--color-control-bg-border-secondary-hover',
  '--color-control-typo-secondary',
  '--color-control-typo-secondary-hover',
  '--color-control-bg-ghost',
  '--color-control-bg-ghost-hover',
  '--color-control-typo-ghost',
  '--color-control-typo-ghost-hover',
  '--color-control-bg-clear',
  '--color-control-bg-clear-hover',
  '--color-control-typo-clear',
  '--color-control-typo-clear-hover',
  '--color-control-bg-disable',
  '--color-control-bg-border-disable',
  '--color-control-typo-disable',
] as const;

type Action =
  | { type: 'add'; item: SnackBarItemDefault }
  | { type: 'remove'; key: number | string };

function reducer(state: SnackBarItemDefault[], action: Action) {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((item) => item.key !== action.key);
  }
}

export const ThemePreview: React.FC = () => {
  const [copiedItems, dispatchCopiedItems] = useReducer(reducer, []);

  const clickHandlerCallback = (item: { color: string }) => () => {
    dispatchCopiedItems({
      type: 'add',
      item: {
        key: `${item.color}-${copiedItems.length + 1}`,
        message: 'Значение скопировано в буфер обмена',
        status: 'system',
        autoClose: 3,
        onClose: (item) => {
          dispatchCopiedItems({ type: 'remove', key: item.key });
        },
      },
    });
  };

  const [ref, primaryColors] = useStyleProps(cssColorVars);

  return (
    <div ref={ref} className={wp.layout()}>
      <SnackBar className={cnThemePreview('Snackbar')} items={copiedItems} />
      <div className={wp.layout('content')}>
        <div className={wp.layout('container', { size: 'm' })}>
          <section>
            <Text
              as="h2"
              size="xl"
              view="primary"
              weight="bold"
              className={cnMixSpace({ mB: 'xl', mT: '3xl' })}
              lineHeight="m"
            >
              Цвета фонов
            </Text>
            <div
              className={wp.tplGrid({
                's-ratio': '1-1-1',
                'col-gap': 'full',
                'row-gap': 'full',
              })}
            >
              {bgColors.map((item, index) => {
                const { color, description } = item;
                return (
                  <ColorPreview
                    value={primaryColors[color]}
                    color={color}
                    description={description}
                    key={index}
                    clickHandler={clickHandlerCallback(item)}
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
              className={cnMixSpace({ mB: 'xl', mT: '3xl' })}
              lineHeight="m"
            >
              Цвета типографики
            </Text>

            <div
              className={wp.tplGrid({
                's-ratio': '1-1-1',
                'col-gap': 'full',
                'row-gap': 'full',
              })}
            >
              {typoColors.map((item, index) => {
                return (
                  <ColorPreview
                    value={primaryColors[item.color]}
                    color={item.color}
                    description={item.description}
                    key={index}
                    clickHandler={clickHandlerCallback(item)}
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
              className={cnMixSpace({ mB: 'xl', mT: '3xl' })}
              lineHeight="m"
            >
              Цвета скроллбара
            </Text>
            <div
              className={wp.tplGrid({
                's-ratio': '1-1-1',
                'col-gap': 'full',
                'row-gap': 'full',
              })}
            >
              {scrollbarColors.map((item, index) => {
                return (
                  <ColorPreview
                    value={primaryColors[item.color]}
                    color={item.color}
                    description={item.description}
                    key={index}
                    clickHandler={clickHandlerCallback(item)}
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
              className={cnMixSpace({ mB: 'xl', mT: '3xl' })}
              lineHeight="m"
            >
              Цвета контролов
            </Text>
            <div
              className={wp.tplGrid({
                's-ratio': '1-1-1',
                'col-gap': 'full',
                'row-gap': 'full',
              })}
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
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback(item)}
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
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback(item)}
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
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback(item)}
                      />
                    );
                  })}
                </div>
              </section>

              <section className={cnMixSpace({ mB: 'xl', mT: '3xl' })}>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Ghost
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для третьестепенных контролов, часто идущих в паре с
                  Primary
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {ghostControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback(item)}
                      />
                    );
                  })}
                </div>
              </section>

              <section className={cnMixSpace({ mB: 'xl', mT: '3xl' })}>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Clear
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для «невидимых» контролов (примущественно кнопки без
                  явной границы)
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {clearControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback(item)}
                      />
                    );
                  })}
                </div>
              </section>

              <section className={cnMixSpace({ mB: 'xl', mT: '3xl' })}>
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
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback(item)}
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
