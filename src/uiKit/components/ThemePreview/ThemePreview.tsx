import './ThemePreview.css';

import React, { useReducer } from 'react';

import { Grid, GridProps } from '##/components/Grid';
import { Text } from '##/components/Text';
import { useStyleProps } from '##/hooks/useStyleProps';
import { cnMixSpace } from '##/mixs/MixSpace/MixSpace';

import { SnackBar } from '../../../components/SnackBar/SnackBar';
import { SnackBarItemDefault } from '../../../components/SnackBar/types';
import { cn } from '../../cn';
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

  const gridProps: GridProps & { className: string } = {
    breakpointsForRef: ref,
    breakpoints: {
      620: {
        cols: 2,
      },
      760: {
        cols: 3,
      },
    },
    colGap: 'm',
    rowGap: 'l',
    cols: 1,
    className: cnMixSpace({ mB: '3xl' }),
  };

  return (
    <div ref={ref}>
      <SnackBar className={cnThemePreview('Snackbar')} items={copiedItems} />

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
        <Grid {...gridProps}>
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
        </Grid>
      </section>

      <section>
        <Text
          as="h2"
          size="xl"
          view="primary"
          weight="bold"
          className={cnMixSpace({ mB: 'xl' })}
          lineHeight="m"
        >
          Цвета типографики
        </Text>

        <Grid {...gridProps}>
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
        </Grid>
      </section>

      <section>
        <Text
          as="h2"
          size="xl"
          view="primary"
          weight="bold"
          className={cnMixSpace({ mB: 'xl' })}
          lineHeight="m"
        >
          Цвета скроллбара
        </Text>
        <Grid {...gridProps}>
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
        </Grid>
      </section>

      <section>
        <Text
          as="h2"
          size="xl"
          view="primary"
          weight="bold"
          className={cnMixSpace({ mB: 'xl' })}
          lineHeight="m"
        >
          Цвета контролов
        </Text>
        <div>
          <section>
            <Text
              as="h3"
              size="l"
              view="secondary"
              transform="uppercase"
              weight="semibold"
              spacing="xs"
              className={cnMixSpace({ mB: 'xs' })}
            >
              Default
            </Text>
            <Text
              as="p"
              size="m"
              view="secondary"
              className={cnMixSpace({ mB: 'xl' })}
            >
              Цвета для большинства нейтральных контролов
            </Text>
            <Grid {...gridProps}>
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
            </Grid>
          </section>

          <section>
            <Text
              as="h3"
              size="l"
              view="secondary"
              transform="uppercase"
              weight="semibold"
              spacing="xs"
              className={cnMixSpace({ mB: 'xs' })}
            >
              Primary
            </Text>
            <Text
              as="p"
              size="m"
              view="secondary"
              className={cnMixSpace({ mB: 'xl' })}
            >
              Цвета для акцентных контролов и состояний
            </Text>
            <Grid {...gridProps}>
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
            </Grid>
          </section>

          <section>
            <Text
              as="h3"
              size="l"
              view="secondary"
              transform="uppercase"
              weight="semibold"
              spacing="xs"
              className={cnMixSpace({ mB: 'xs' })}
            >
              Secondary
            </Text>
            <Text
              as="p"
              size="m"
              view="secondary"
              className={cnMixSpace({ mB: 'xl' })}
            >
              Цвета для второстепенных контролов (преимущественно кнопки)
            </Text>

            <Grid {...gridProps}>
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
            </Grid>
          </section>

          <section className={cnMixSpace({ mB: 'xl' })}>
            <Text
              as="h3"
              size="l"
              view="secondary"
              transform="uppercase"
              weight="semibold"
              spacing="xs"
              className={cnMixSpace({ mB: 'xs' })}
            >
              Ghost
            </Text>
            <Text
              as="p"
              size="m"
              view="secondary"
              className={cnMixSpace({ mB: 'xl' })}
            >
              Цвета для третьестепенных контролов, часто идущих в паре с Primary
            </Text>

            <Grid {...gridProps}>
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
            </Grid>
          </section>

          <section className={cnMixSpace({ mB: 'xl' })}>
            <Text
              as="h3"
              size="l"
              view="secondary"
              transform="uppercase"
              weight="semibold"
              spacing="xs"
              className={cnMixSpace({ mB: 'xs' })}
            >
              Clear
            </Text>
            <Text
              as="p"
              size="m"
              view="secondary"
              className={cnMixSpace({ mB: 'xl' })}
            >
              Цвета для «невидимых» контролов (примущественно кнопки без явной
              границы)
            </Text>

            <Grid {...gridProps}>
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
            </Grid>
          </section>

          <section className={cnMixSpace({ mB: 'xl' })}>
            <Text
              as="h3"
              size="l"
              view="secondary"
              transform="uppercase"
              weight="semibold"
              spacing="xs"
              className={cnMixSpace({ mB: 'xs' })}
            >
              Disable
            </Text>
            <Text
              as="p"
              size="m"
              view="secondary"
              className={cnMixSpace({ mB: 'xl' })}
            >
              Цвета для недоступных контролов
            </Text>

            <Grid {...gridProps}>
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
            </Grid>
          </section>
        </div>
      </section>
    </div>
  );
};

export default ColorPreview;
