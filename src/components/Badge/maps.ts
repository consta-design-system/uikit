import { Space } from '##/mixs/MixSpace';

import {
  BadgePropForm,
  BadgePropSize,
  BadgePropStatus,
  BadgePropView,
} from './types';

const horisontalPaddingRoundMap: Record<BadgePropSize, Space> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

const horisontalPaddingDefaultMap: Record<BadgePropSize, Space> = {
  xs: '2xs',
  s: '2xs',
  m: 'xs',
  l: 'xs',
};

export const getHorisontalPadding = (
  size: BadgePropSize,
  form: BadgePropForm,
  minified: boolean,
) => {
  if (minified) {
    return undefined;
  }
  if (form === 'default') {
    return `var(--space-${horisontalPaddingDefaultMap[size]})`;
  }
  return `var(--space-${horisontalPaddingRoundMap[size]})`;
};

const sizeMap: Record<BadgePropSize, Space> = {
  xs: 'm',
  s: 'l',
  m: 'xl',
  l: '2xl',
};

const sizeMinifiedMap: Record<BadgePropSize, number> = {
  xs: 10,
  s: 16,
  m: 24,
  l: 32,
};

export const getSize = (size: BadgePropSize, minified: boolean) => {
  if (minified) {
    return `${sizeMinifiedMap[size]}px`;
  }

  return `var(--space-${sizeMap[size]})`;
};

const textSizeMap: Record<BadgePropSize, string> = {
  xs: 'calc(var(--size-text-m) / 2)',
  s: 'var(--size-text-2xs)',
  m: 'var(--size-text-xs)',
  l: 'var(--badge-text-size)',
};

export const getTextSize = (size: BadgePropSize) => textSizeMap[size];

const minifiedBorderSizeMap: Record<BadgePropSize, number> = {
  xs: 2,
  s: 3,
  m: 4,
  l: 5,
};

export const getMinifiedBorderSize = (size: BadgePropSize, minified: boolean) =>
  minified ? `${minifiedBorderSizeMap[size]}px` : undefined;

export const getBgColor = (status: BadgePropStatus) =>
  status === 'disabled'
    ? 'var(--color-control-bg-disable)'
    : `var(--color-bg-${status})`;

export const getTextColor = (status: BadgePropStatus, view: BadgePropView) => {
  if (status === 'disabled') {
    return 'var(--color-control-typo-disable)';
  }
  if (status === 'system') {
    return 'var(--color-typo-secondary)';
  }
  if (view === 'filled') {
    return 'var(--color-typo-primary)';
  }
  return `var(--color-typo-${status})`;
};

export const getBorderColor = (
  status: BadgePropStatus,
  view: BadgePropView,
) => {
  if (view === 'stroked' && status === 'disabled') {
    return 'var(--color-control-bg-border-disable)';
  }
  if (view === 'stroked') {
    return `var(--color-bg-${status})`;
  }
  return undefined;
};

export const getDegreeMixing = (
  status: BadgePropStatus,
  view: BadgePropView,
) => {
  if (view === 'tinted' && status === 'disabled') {
    return '30%';
  }
  if (view === 'tinted') {
    return '10%';
  }
  return undefined;
};
