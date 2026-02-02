import { ColorPickerInputProps } from '../ColorPickerInput';
import { AnyColor } from '../types';

export type ColorControlProps<T extends AnyColor> = ColorPickerInputProps<T> & {
  markerRef?: React.RefObject<HTMLButtonElement>;
  onlyMarker?: boolean;
};

export type ColorControlComponent = <T extends AnyColor>(
  props: ColorControlProps<T>,
) => React.ReactElement;
