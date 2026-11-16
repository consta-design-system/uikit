import './Avatar.css';

import { computed } from '@reatom/core';
import React from 'react';

import { factoryComponent } from '##/utils/state';
import { AsTags } from '##/utils/types/AsTags';
import { PropsWithAsAttributes } from '##/utils/types/PropsWithAsAttributes';

import { cn } from '../../utils/bem';
import {
  getColorIndexForName,
  getInitialsForName,
  MAX_COLOR_INDEX,
} from './helpers';

export const avatarPropSize = ['m', 's', 'xs', 'l'] as const;
export type AvatarPropSize = (typeof avatarPropSize)[number];
export const avatarPropSizeDefault: AvatarPropSize = avatarPropSize[0];

export const avatarPropForm = ['round', 'brick', 'default'] as const;
export type AvatarPropForm = (typeof avatarPropForm)[number];
export const avatarPropFormDefault: AvatarPropForm = avatarPropForm[0];

export type AvatarProps<AS extends AsTags = 'div'> = PropsWithAsAttributes<
  {
    url?: string;
    name?: string;
    size?: AvatarPropSize;
    form?: AvatarPropForm;
    children?: never;
    monochrome?: boolean;
  },
  AS
>;

export type AvatarComponent = <AS extends AsTags = 'div'>(
  props: AvatarProps<AS>,
) => React.ReactNode | null;

export const cnAvatar = cn('Avatar');

export const Avatar = factoryComponent<HTMLDivElement, AvatarProps>(
  (_, propsAtom) => {
    const nameAtom = computed(() => propsAtom().name);
    const monochromeAtom = computed(() => propsAtom().monochrome);
    const initialsAtom = computed(() => getInitialsForName(nameAtom()));

    const colorIndexAtom = computed(() =>
      getColorIndexForName(nameAtom(), MAX_COLOR_INDEX, monochromeAtom()),
    );

    return ({
      as: Tag = 'div',
      className,
      size = avatarPropSizeDefault,
      form = avatarPropFormDefault,
      url,
      name,
      monochrome,
      style,
      ref,
      ...otherProps
    }) => (
      <Tag
        {...otherProps}
        style={
          !url
            ? {
                ...style,
                ['--avatar-color' as string]: `var(--avatar-color-${colorIndexAtom()})`,
              }
            : style
        }
        className={cnAvatar(
          { size, form, monochrome: url ? monochrome : undefined },
          [className],
        )}
        ref={ref}
      >
        {url && <img className={cnAvatar('Image')} src={url} alt={name} />}
        {!url && initialsAtom()}
      </Tag>
    );
  },
) as AvatarComponent;
