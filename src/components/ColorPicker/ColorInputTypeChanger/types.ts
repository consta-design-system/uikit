import { ColorPickerInputProps } from '../ColorPickerInput';
import { ColorInputFormat } from '../types';

export type ColorInputTypeChangerProps<T> = Omit<
  ColorPickerInputProps<T>,
  'format'
> & {
  format?: ColorInputFormat[] | ColorInputFormat;
};

export type ColorInputTypeChangerComponent = <T>(
  props: ColorInputTypeChangerProps<T>,
) => React.ReactElement;
