import { ColorPickerInputProps } from '../ColorPickerInput';

export type ColorControlProps<T> = ColorPickerInputProps<T> & {
  markerRef?: React.RefObject<HTMLButtonElement | null>;
  onlyMarker?: boolean;
};

export type ColorControlComponent = <T>(
  props: ColorControlProps<T>,
) => React.ReactElement;
