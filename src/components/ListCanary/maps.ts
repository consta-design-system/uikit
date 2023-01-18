import { Space } from '##/mixs/MixSpace';

import { ListPropSize } from './types';

export const mapHorisontalSpase: Record<ListPropSize, Space> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

export const mapHorisontalSpaseIncreased: Record<ListPropSize, Space> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

export const mapGroupVerticalSpaseTop: Record<ListPropSize, Space> = {
  xs: 's',
  s: 'm',
  m: 'm',
  l: 'l',
};

export const mapGroupVerticalSpaseBottom: Record<ListPropSize, Space> = {
  xs: '2xs',
  s: '2xs',
  m: 'xs',
  l: 's',
};
