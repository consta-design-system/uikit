import React from 'react';

import { Direction } from '##/components/Popover';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { AnyColor, ColorInputFormat, ColorModel } from '../types';

export type ColorPickerPropForm = 'default' | 'brick' | 'round';

export type ColorPickerProps<T> = PropsWithHTMLAttributesAndRef<
  {
    model: ColorModel<T>;
    value?: T;
    onOpen?: (open: boolean) => void;
    open?: boolean;
    anchorRef?: React.RefObject<HTMLElement>;
    controlRef?: React.RefObject<HTMLElement>;
    direction?: Direction;
    spareDirection?: Direction;
    possibleDirections?: Direction[];
    viewportRef?: React.RefObject<HTMLElement>;
    header?: React.ReactNode;
    onChange: (value: T) => void;
    alpha?: boolean;
    pallette?: T[];
    paletteTitle?: React.ReactNode;
    mainControl?: boolean;
    format?: ColorInputFormat[] | ColorInputFormat | false;
  },
  HTMLDivElement
>;

export type ColorPickerComponent = <T extends AnyColor>(
  props: ColorPickerProps<T>,
) => React.ReactNode | null;
