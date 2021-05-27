import { RefObject } from 'react';

export const propSize = ['m', 'xs', 's', 'l'] as const;
export type PropSize = typeof propSize[number];
export const defaultPropSize = propSize[0];

export const propForm = [
  'default',
  'brick',
  'round',
  'clearRound',
  'roundClear',
  'clearDefault',
  'defaultClear',
  'defaultBrick',
  'brickDefault',
  'brickClear',
  'clearBrick',
  'clearClear',
] as const;
export type PropForm = typeof propForm[number];
export const defaultPropForm = propForm[0];

export const propView = ['default', 'clear'] as const;
export type PropView = typeof propView[number];
export const defaultPropView = propView[0];

export type CommonSelectProps<ITEM> = {
  options: ITEM[];
  id: string;
  placeholder?: string;
  ariaLabel?: string;
  getOptionLabel(arg: ITEM): string;
  getOptionKey?(arg: ITEM): string | number;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  children?: never;
  dropdownClassName?: string;
  dropdownRef?: RefObject<HTMLDivElement>;
  name?: string;
};

export type RenderItemProps<ITEM> = {
  item: ITEM;
  active: boolean;
  hovered: boolean;
  onClick: (e: React.SyntheticEvent) => void;
  onMouseEnter: (e: React.SyntheticEvent) => void;
};
