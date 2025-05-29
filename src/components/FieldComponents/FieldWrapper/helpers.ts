import { MixFlexPropDirection } from '##/mixs/MixFlex';
import { Space } from '##/mixs/MixSpace';

import { FieldPropSize } from '../types';
import { FieldWrapperProps } from './types';

export const spaceMap: Record<FieldPropSize, Space> = {
  l: 'xs',
  m: 'xs',
  s: '2xs',
  xs: '2xs',
};

export const directionMap: Record<
  Exclude<FieldWrapperProps['labelPosition'], undefined>,
  MixFlexPropDirection
> = {
  top: 'column',
  left: 'row',
};
