import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export const switchPropSize = ['m', 'xs', 's', 'l'] as const;
export type SwitchPropSize = typeof switchPropSize[number];
export const switchPropSizeDefault: SwitchPropSize = switchPropSize[0];

export const switchPropView = ['primary', 'ghost'] as const;
export type SwitchPropView = typeof switchPropView[number];
export const switchPropViewDefault: SwitchPropView = switchPropView[0];

export const switchPropAlign = ['center', 'top'] as const;
export type SwitchPropAlign = typeof switchPropAlign[number];
export const switchPropAlignDefault: SwitchPropAlign = switchPropAlign[0];

export type SwitchPropOnChange = (object: {
  e: React.ChangeEvent<HTMLInputElement>;
  checked: boolean;
}) => void;

export type SwitchProps = PropsWithHTMLAttributes<
  {
    checked: boolean | undefined;
    size?: SwitchPropSize;
    view?: SwitchPropView;
    align?: SwitchPropAlign;
    disabled?: boolean;
    className?: string;
    label?: string;
    onChange?: SwitchPropOnChange;
    name?: string;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    readOnly?: boolean;
    required?: boolean;
    step?: number | string;
    tabIndex?: number;
    inputRef?: React.Ref<HTMLInputElement>;
    children?: never;
  },
  HTMLLabelElement
>;
