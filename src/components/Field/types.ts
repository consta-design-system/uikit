export type FieldPropSize = 'm' | 'xs' | 's' | 'l';
export type FieldPropForm =
  | 'default'
  | 'defaultClear'
  | 'defaultBrick'
  | 'brick'
  | 'brickDefault'
  | 'brickClear'
  | 'brickRound'
  | 'round'
  | 'roundClear'
  | 'roundBrick'
  | 'clearRound'
  | 'clearDefault'
  | 'clearBrick'
  | 'clear'
  // @deprecated use 'clear'
  | 'clearClear';

export type FieldPropStatus = 'alert' | 'success' | 'warning';
export type FieldPropView = 'default' | 'clear';
