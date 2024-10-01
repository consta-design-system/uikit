import { FieldGroupPropForm } from './types';

const mapForm: Record<
  FieldGroupPropForm,
  [Exclude<FieldGroupPropForm, 'clear'>, Exclude<FieldGroupPropForm, 'clear'>]
> = {
  default: ['defaultClear', 'brickDefault'],
  defaultClear: ['defaultClear', 'brickClear'],
  defaultBrick: ['defaultClear', 'brick'],
  brick: ['brickClear', 'brick'],
  brickDefault: ['brickClear', 'brickDefault'],
  brickClear: ['brickClear', 'brickClear'],
  brickRound: ['brickClear', 'brickRound'],
  round: ['roundClear', 'brickRound'],
  roundClear: ['roundClear', 'brickClear'],
  roundBrick: ['roundClear', 'brick'],
  clearRound: ['clearClear', 'brickRound'],
  clearDefault: ['clearClear', 'brickDefault'],
  clearBrick: ['clearClear', 'brick'],
  clearClear: ['clearClear', 'brickClear'],
  clear: ['clearClear', 'brickClear'],
};

export const getForm = (
  form: FieldGroupPropForm = 'default',
  index: number,
  length: number,
): Exclude<FieldGroupPropForm, 'clear'> => {
  if (index === 0) {
    return mapForm[form][0];
  }
  if (index === length - 1) {
    return mapForm[form][1];
  }
  return 'brickClear';
};
