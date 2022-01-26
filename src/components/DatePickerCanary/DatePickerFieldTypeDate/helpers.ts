import { IconComponent, IconPropSize } from '../../../icons/Icon/Icon';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../../TextField/TextField';
import { DatePickerPropOnError } from '../helpers';

type DatePickerFieldTypeDatePropOnChange = (props: { e: Event; value: Date | null }) => void;

export type DatePickerFieldTypeDateProps = PropsWithHTMLAttributes<
  {
    className?: string;
    value?: Date | null;
    onChange?: DatePickerFieldTypeDatePropOnChange;
    onError?: DatePickerPropOnError;
    id?: string;
    name?: string;
    disabled?: boolean;
    size?: TextFieldPropSize;
    view?: TextFieldPropView;
    form?: TextFieldPropForm;
    status?: TextFieldPropStatus;
    width?: TextFieldPropWidth;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    autoFocus?: boolean;
    placeholder?: string;
    leftSide?: string | IconComponent;
    rightSide?: string | IconComponent;
    readOnly?: boolean;
    required?: boolean;
    tabIndex?: number;
    inputRef?: React.Ref<HTMLTextAreaElement | HTMLInputElement>;
    ariaLabel?: string;
    iconSize?: IconPropSize;
    children?: never;
    format?: string;
    separator?: string;
    minDate?: Date;
    maxDate?: Date;
    focused?: boolean;
    label?: string;
    caption?: string;
    labelPosition?: 'top' | 'left';
  },
  HTMLDivElement
>;

const getPartDate = (formatArray: string[], stringArray: string[], marker: string) => {
  const index = formatArray.indexOf(marker);

  if (index >= 0 && stringArray[index] && stringArray[index].length === marker.length) {
    return stringArray[index];
  }

  return undefined;
};

export const getPartsDate = (
  value: string,
  format: string,
  separator: string,
  markers: string[] = ['dd', 'MM', 'yyyy'],
) => {
  const formatArray = format.split(separator);
  const valueArray = value.split(separator);

  return markers.map((marker) => getPartDate(formatArray, valueArray, marker));
};
