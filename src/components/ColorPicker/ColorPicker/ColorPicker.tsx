import './ColorPicker.css';

import React, { forwardRef } from 'react';

import { ModalLayout } from '##/components/Modal';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { ColorPalette, ColorPickerBase } from '..';
import { ColorInputTypeChanger } from '../ColorInputTypeChanger';
import { ColorPickerRoot } from '../ColorPickerRoot';
import { ColorPickerComponent, ColorPickerProps } from './types';

export const cnColorPicker = cn('ColorPicker');

const renderNode = (header: React.ReactNode, className?: string) => {
  if (!header) {
    return null;
  }
  if (typeof header === 'string') {
    return (
      <Text className={className} size="s" weight="semibold">
        {header}
      </Text>
    );
  }
  return <div className={className}>{header}</div>;
};

const ColorPickerRender = <T,>(
  props: ColorPickerProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    model,
    value = model.defaultColor,
    anchorRef = props.controlRef,
    controlRef = props.anchorRef,
    className,
    header,
    onChange,
    alpha,
    palette,
    paletteTitle,
    mainControl = true,
    format = ['hex', 'hsl', 'hsv', 'rgb'],
    ...otherProps
  } = props;

  const formats = format
    ? (typeof format === 'string' ? [format] : format)?.length > 0
    : false;

  const pH = anchorRef ? 's' : undefined;

  return (
    <ColorPickerRoot
      {...otherProps}
      ref={ref}
      className={cnColorPicker({ withAnchor: !!anchorRef }, [className])}
      anchorRef={anchorRef}
      controlRef={controlRef}
    >
      <ModalLayout border={[!!header && mainControl, !!palette?.length]}>
        {renderNode(
          header,
          cnColorPicker('Header', cnMixSpace({ pH, pV: 's' })),
        )}
        {mainControl && (
          <ColorPickerBase
            className={cnMixSpace({
              pH,
              pB: formats ? 'xs' : 's',
              pT: 'l',
            })}
            model={model}
            value={value}
            onChange={onChange}
            alpha={alpha}
          />
        )}
        {mainControl && format && formats ? (
          <ColorInputTypeChanger
            className={cnMixSpace({
              pH,
              pB: 's',
            })}
            model={model}
            value={value}
            onChange={onChange}
            alpha={alpha}
            size="xs"
            format={format}
          />
        ) : null}
        {palette && (
          <>
            {renderNode(paletteTitle, cnMixSpace({ pH, pV: 's' }))}
            <ColorPalette
              className={cnMixSpace({
                pH,
                pB: 's',
                pT: paletteTitle ? undefined : 's',
              })}
              model={model}
              value={value}
              onChange={onChange}
              items={palette}
              size="xs"
            />
          </>
        )}
      </ModalLayout>
    </ColorPickerRoot>
  );
};

export const ColorPicker = forwardRef(
  ColorPickerRender,
) as ColorPickerComponent;
