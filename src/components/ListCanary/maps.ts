import { IconPropSize } from '@consta/icons/Icon';

import { Space } from '##/mixs/MixSpace';

import { ListPropSize } from './types';

export const mapHorizontalSpace: Record<ListPropSize, Space> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

export const mapHorizontalSpaceIncreased: Record<ListPropSize, Space> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

export const mapGroupVerticalSpaceTop: Record<ListPropSize, Space> = {
  xs: 's',
  s: 'm',
  m: 'm',
  l: 'l',
};

export const mapGroupVerticalSpaceBottom: Record<ListPropSize, Space> = {
  xs: '2xs',
  s: '2xs',
  m: 'xs',
  l: 's',
};

export const mapItemVerticalPadding: Record<ListPropSize, Space> = {
  xs: '2xs',
  s: '2xs',
  m: 'xs',
  l: 'xs',
};

export const mapIconSize: Record<ListPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

export const mapDividerVerticalSpace: Record<ListPropSize, Space> = {
  l: 'm',
  m: 's',
  s: 'xs',
  xs: '2xs',
};
