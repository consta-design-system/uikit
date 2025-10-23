import './Banner.css';

import { IconComponent } from '@consta/icons/Icon';
import React, { forwardRef } from 'react';

import { cnText, Text } from '##/components/Text';
import { useTheme } from '##/components/Theme/Theme';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace, MixSpaceProps, Space } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { isNotNil, isString } from '##/utils/type-guards';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

export const bannerPropSize = ['xs', 's', 'm', 'l'] as const;
export type BannerPropSize = typeof bannerPropSize[number];
export const bannerPropSizeDefault: BannerPropSize = bannerPropSize[2]; // 'm'

export const bannerPropView = ['filled', 'ghost', 'transparent'] as const;
export type BannerPropView = typeof bannerPropView[number];
export const bannerPropViewDefault: BannerPropView = bannerPropView[0]; // 'filled'

export const bannerPropStatus = [
  'normal',
  'warning',
  'alert',
  'success',
  'system',
] as const;
export type BannerPropStatus = typeof bannerPropStatus[number];
export const bannerPropStatusDefault: BannerPropStatus = bannerPropStatus[0]; // 'normal'

export const bannerPropForm = ['default', 'round', 'brick'] as const;
export type BannerPropForm = typeof bannerPropForm[number];
export const bannerPropFormDefault: BannerPropForm = bannerPropForm[0]; // 'default'

export type BannerProps = PropsWithJsxAttributes<{
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  icon?: IconComponent;
  size?: BannerPropSize;
  view?: BannerPropView;
  space?: MixSpaceProps;
  itemsGap?: Space | [Space, Space];
  status?: BannerPropStatus;
  form?: BannerPropForm;
}>;

export const cnBanner = cn('Banner');

const SlotWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={cnBanner('Slot')}>{children}</div>
);

const renderSlot = (slot: React.ReactNode, index: number, position: number) => {
  if (isString(slot)) {
    return (
      <SlotWrapper key={cnBanner('Slot', { index, position })}>
        <Text
          className={cnBanner('Text')}
          view="primary"
          weight={index === 0 && position === 0 ? 'bold' : undefined}
          lineHeight="m"
        >
          {slot}
        </Text>
      </SlotWrapper>
    );
  }

  return (
    <SlotWrapper key={cnBanner('Slot', { index, position })}>
      {slot}
    </SlotWrapper>
  );
};

const renderSlots = (slot: React.ReactNode, position: number) => {
  if (Array.isArray(slot)) {
    return slot
      .filter(isNotNil)
      .map((item, index) => renderSlot(item, index, position));
  }
  return renderSlots([slot], position);
};

const getGap = (gap: Space | [Space, Space], index: number) => {
  if (Array.isArray(gap)) {
    return gap[index];
  }
  return gap;
};

const textSizeMap: Record<BannerPropSize, 'xs' | 's' | 'm' | 'l'> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

const controlSizeMap: Record<BannerPropSize, 'xs' | 's' | 'm'> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 'm',
};

/**
 * Компонент Banner, отображающий содержимое слева и справа.
 * Поддерживает иконки, размеры, виды, статусы и формы.
 *
 * @property {React.ReactNode} [leftSide] - Содержимое на левой стороне.
 * @property {React.ReactNode} [rightSide] - Содержимое на правой стороне.
 * @property {IconComponent} [icon] - Иконка.
 * @property {BannerPropSize} [size] - Размер компонента.
 * @property {BannerPropView} [view] - Визуальный стиль.
 * @property {MixSpaceProps} [space] - Параметры отступов.
 * @property {Space | [Space, Space]} [itemsGap] - Отступы между элементами.
 * @property {BannerPropStatus} [status] - Статус (цветовая схема).
 * @property {BannerPropForm} [form] - Форма компонента.
 */

export const Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  const {
    leftSide,
    rightSide,
    icon: Icon,
    size = bannerPropSizeDefault,
    view = bannerPropViewDefault,
    className,
    space,
    itemsGap = 's',
    status = bannerPropStatusDefault,
    style,
    form = bannerPropFormDefault,
    ...otherProps
  } = props;

  const { themeClassNames } = useTheme();

  const leftSlots = renderSlots(
    [
      Icon ? <Icon className={cnBanner('Icon')} /> : null,
      ...(Array.isArray(leftSide) ? leftSide : [leftSide]),
    ],
    0,
  );

  const rightSlots = renderSlots(rightSide, 1);

  return (
    <div
      {...otherProps}
      className={cnBanner({ view, form, size }, [
        cnMixFlex({
          justify:
            rightSlots.length && !leftSlots.length
              ? 'flex-end'
              : 'space-between',
          align: 'center',
          gap: 'm',
        }),
        cnMixSpace(space || { pH: size, pV: 'xs' }),
        cnText({ size: textSizeMap[size] }),
        status !== 'system' && view === 'filled'
          ? themeClassNames.color.accent
          : undefined,
        className,
      ])}
      style={{
        ...style,
        ['--banner-bg-color' as string]: `var(--color-bg-${status})`,
        ['--banner-inner-height' as string]: `var(--control-height-${controlSizeMap[size]})`,
      }}
      ref={ref}
    >
      {leftSlots.length ? (
        <div
          className={cnMixFlex({ gap: getGap(itemsGap, 0), align: 'center' })}
        >
          {leftSlots}
        </div>
      ) : undefined}
      {rightSlots.length ? (
        <div
          className={cnMixFlex({ gap: getGap(itemsGap, 1), align: 'center' })}
        >
          {rightSlots}
        </div>
      ) : undefined}
    </div>
  );
});
