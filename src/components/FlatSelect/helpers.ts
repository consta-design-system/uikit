import { MixSpaceProps } from '##/mixs/MixSpace';

import { FieldPropSize, FieldPropView } from '../FieldComponents';

const inputSpaceMapBySize: Record<FieldPropSize, MixSpaceProps> = {
  xs: { pB: '2xs' },
  s: { pB: 'xs' },
  m: { pB: 's' },
  l: { pB: 'm' },
};

export const inputSpaceMap = (
  view: FieldPropView,
  size: FieldPropSize,
): MixSpaceProps => {
  if (view === 'clear') return { pV: '2xs', pH: 's' };

  return { pB: inputSpaceMapBySize[size] };
};
