import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { FieldPropSize } from '../types';

export type FieldArrayValueInlineControlProps<ITEM> =
  PropsWithHTMLAttributesAndRef<
    {
      children?: never;
      value?: ITEM[];
      renderValue: (item: ITEM, index: number) => React.ReactNode;
      inputMaxLength?: number;
      inputValue?: string;
      inputDafeultValue?: string;
      inputRef?: React.Ref<HTMLInputElement>;
      onInputFocus?: React.FocusEventHandler<HTMLInputElement>;
      onInputBlur?: React.FocusEventHandler<HTMLInputElement>;
      onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
      inputAutoFocus?: boolean;
      inputTabIndex?: number;
      inputAriaLabel?: string;
      onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
      onInputKeyDownCapture?: React.KeyboardEventHandler<HTMLInputElement>;
      onInputKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
      onInputKeyUpCapture?: React.KeyboardEventHandler<HTMLInputElement>;
      disabled?: boolean;
      placeholder?: string;
      size?: FieldPropSize;
    },
    HTMLDivElement
  >;

export type FieldArrayValueInlineControlComponent = <ITEM>(
  props: FieldArrayValueInlineControlProps<ITEM>,
) => React.ReactElement | null;
