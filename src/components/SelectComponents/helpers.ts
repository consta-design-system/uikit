import { selectDropdownform, SelectDropdownPropForm } from './SelectDropdown/SelectDropdown';
import { PropForm } from './types';

const mapDropdownForms: Record<PropForm, SelectDropdownPropForm> = {
  default: selectDropdownform[0],
  brick: selectDropdownform[1],
  round: selectDropdownform[2],
  clearRound: selectDropdownform[2],
  roundClear: selectDropdownform[2],
  clearDefault: selectDropdownform[0],
  defaultClear: selectDropdownform[0],
  defaultBrick: selectDropdownform[0],
  brickDefault: selectDropdownform[1],
  brickClear: selectDropdownform[1],
  clearBrick: selectDropdownform[1],
  clearClear: selectDropdownform[0],
};

export function getSelectDropdownForm(form: PropForm): SelectDropdownPropForm {
  return mapDropdownForms[form];
}

export const defaultlabelForNotFound = 'Не найдено';
export const defaultlabelForCreate = '+';

export const getInputWidth = (
  controlInnerRef: React.RefObject<HTMLDivElement>,
  helperInputFakeElement: React.RefObject<HTMLDivElement>,
): number => {
  if (!controlInnerRef.current || !helperInputFakeElement.current) {
    return 20;
  }
  const fakeElWidth = helperInputFakeElement.current.offsetWidth + 20;
  const maxWidth = controlInnerRef.current ? controlInnerRef.current.offsetWidth - 15 : 2;
  const width = fakeElWidth > maxWidth ? maxWidth : fakeElWidth;
  return width;
};
