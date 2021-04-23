import { RefObject } from 'react';

export const sizes = ['xs', 's', 'm', 'l'] as const;
export type PropSize = typeof sizes[number];
export const DefaultPropSize: PropSize = 'm';

export const form = [
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
export type PropForm = typeof form[number];
export const DefaultPropForm: PropForm = 'default';

export const view = ['default', 'clear'] as const;
export type PropView = typeof view[number];
export const DefaultPropView: PropView = 'default';

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
