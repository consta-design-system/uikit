import { FieldPropForm } from '../types';

export type FieldControlLayoutBorderRadiusNode = 0 | 'default' | 'round';
export type FieldControlLayoutBorderWidthNode = true | false;
export type FieldControlLayoutPaddingNode = 'default' | 'increased';

export type FieldControlLayoutBorderRadius = [
  FieldControlLayoutBorderRadiusNode,
  FieldControlLayoutBorderRadiusNode,
  FieldControlLayoutBorderRadiusNode,
  FieldControlLayoutBorderRadiusNode,
];

export type FieldControlLayoutBorderWidth = [
  FieldControlLayoutBorderWidthNode,
  FieldControlLayoutBorderWidthNode,
];

export type FieldControlLayoutPadding = [
  FieldControlLayoutPaddingNode,
  FieldControlLayoutPaddingNode,
];

export type FieldControlLayoutBorderRadiusMap = Record<
  FieldPropForm,
  FieldControlLayoutBorderRadius
>;

export type FieldControlLayoutBorderWidthMap = Record<
  FieldPropForm,
  FieldControlLayoutBorderWidth
>;

export type FieldControlLayoutPaddingMap = Record<
  FieldPropForm,
  FieldControlLayoutPadding
>;

const borderRadiusVariants: FieldControlLayoutBorderRadius[] = [
  [0, 0, 0, 0],
  [0, 'default', 'default', 0],
  [0, 'round', 'round', 0],
  ['default', 'default', 'default', 'default'],
  ['default', 0, 0, 'default'],
  ['round', 'round', 'round', 'round'],
  ['round', 0, 0, 'round'],
];

export const borderRadiusMap: FieldControlLayoutBorderRadiusMap = {
  brick: borderRadiusVariants[0],
  brickClear: borderRadiusVariants[0],
  brickDefault: borderRadiusVariants[1],
  brickRound: borderRadiusVariants[2],
  clear: borderRadiusVariants[0],
  // @deprecated use 'clear'
  clearClear: borderRadiusVariants[0],
  clearBrick: borderRadiusVariants[0],
  clearDefault: borderRadiusVariants[1],
  clearRound: borderRadiusVariants[2],
  default: borderRadiusVariants[3],
  defaultBrick: borderRadiusVariants[4],
  defaultClear: borderRadiusVariants[4],
  round: borderRadiusVariants[5],
  roundBrick: borderRadiusVariants[6],
  roundClear: borderRadiusVariants[6],
};

const borderWidthVariants: FieldControlLayoutBorderWidth[] = [
  [true, true],
  [true, false],
  [false, true],
  [false, false],
];

export const borderWidthMap: FieldControlLayoutBorderWidthMap = {
  // [top,right,bottom,left]
  brick: borderWidthVariants[0],
  brickClear: borderWidthVariants[1],
  brickDefault: borderWidthVariants[0],
  brickRound: borderWidthVariants[0],
  clear: borderWidthVariants[3],
  // @deprecated use 'clear'
  clearClear: borderWidthVariants[3],
  clearBrick: borderWidthVariants[2],
  clearDefault: borderWidthVariants[2],
  clearRound: borderWidthVariants[2],
  default: borderWidthVariants[0],
  defaultBrick: borderWidthVariants[0],
  defaultClear: borderWidthVariants[1],
  round: borderWidthVariants[0],
  roundBrick: borderWidthVariants[0],
  roundClear: borderWidthVariants[1],
};

const paddingVariants: FieldControlLayoutPadding[] = [
  ['default', 'default'],
  ['default', 'increased'],
  ['increased', 'default'],
  ['increased', 'increased'],
];

export const paddingMap: FieldControlLayoutPaddingMap = {
  brick: paddingVariants[0],
  brickClear: paddingVariants[0],
  brickDefault: paddingVariants[0],
  brickRound: paddingVariants[1],
  clear: paddingVariants[0],
  // @deprecated use 'clear'
  clearClear: paddingVariants[0],
  clearBrick: paddingVariants[0],
  clearDefault: paddingVariants[0],
  clearRound: paddingVariants[1],
  default: paddingVariants[0],
  defaultBrick: paddingVariants[0],
  defaultClear: paddingVariants[0],
  round: paddingVariants[3],
  roundBrick: paddingVariants[2],
  roundClear: paddingVariants[2],
};
