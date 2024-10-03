import {
  FieldPropForm,
  FieldPropSize,
  FieldPropStatus,
  FieldPropView,
} from '../types';

export const fieldPropSize: FieldPropSize[] = ['xs', 's', 'm', 'l'];
export const fieldPropSizeDefault: FieldPropSize = 'm';

export const fieldPropForm: FieldPropForm[] = [
  'default',
  'defaultClear',
  'defaultBrick',
  'brick',
  'brickDefault',
  'brickClear',
  'brickRound',
  'round',
  'roundClear',
  'roundBrick',
  'clearRound',
  'clearDefault',
  'clearBrick',
  'clear',
];
export const fieldPropFormDefault: FieldPropForm = 'default';

export const fieldPropStatus: FieldPropStatus[] = [
  'alert',
  'success',
  'warning',
];

export const fieldPropView: FieldPropView[] = ['clear', 'default'];
export const fieldPropViewDefault: FieldPropView = 'default';

export const fieldPropFocused = [true, false];
export const fieldPropHovered = [true, false];
export const fieldPropDisabled = [true, false];
