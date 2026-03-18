import './ColorControl.css';

import { classnames } from '@bem-react/classnames';
import React, { forwardRef, useCallback, useState } from 'react';

import {
  FieldControlLayout,
  FieldPropForm,
} from '##/components/FieldComponents';
import { useDebounce } from '##/hooks/useDebounce';
import { cnMixHitSlop } from '##/mixs/MixHitSlop';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { ColorMarker } from '../ColorMarker';
import { ColorPickerInput } from '../ColorPickerInput';
import { AnyColor } from '../types';
import { ColorControlComponent, ColorControlProps } from './types';

const cnColorControl = cn('ColorControl');

const mapSizeMarker = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 'm',
} as const;

const mapFormMarker: Record<FieldPropForm, 'default' | 'brick' | 'round'> = {
  default: 'default',
  defaultClear: 'default',
  defaultBrick: 'default',
  brick: 'brick',
  brickDefault: 'brick',
  brickClear: 'brick',
  brickRound: 'brick',
  round: 'round',
  roundClear: 'round',
  roundBrick: 'round',
  clearRound: 'default',
  clearDefault: 'default',
  clearBrick: 'default',
  clear: 'default',
} as const;

export const ColorControlRender = <T extends AnyColor>(
  {
    className,
    model,
    value,
    onChange,
    size = 'm',
    disabled,
    format,
    alpha,
    id,
    name,
    view = 'default',
    form = 'default',
    markerRef,
    onlyMarker,
    ...otherProps
  }: ColorControlProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [focused, setFocused] = useState(false);
  const debouncedSetFocused = useDebounce(setFocused, 1);

  const setFocusedOn = useCallback(() => {
    debouncedSetFocused(true);
  }, []);

  const setFocusedOff = useCallback(() => {
    debouncedSetFocused(false);
  }, []);

  return (
    <FieldControlLayout
      {...otherProps}
      disabled={disabled}
      size={size}
      ref={ref}
      form={form}
      view={view}
      className={classnames(
        cnColorControl({ view, size, onlyMarker }, className),
        view === 'default' ? cnMixSpace({ pH: 'xs', pV: '2xs' }) : undefined,
      )}
      leftSide={
        <ColorMarker
          className={cnColorControl('Marker', [
            onlyMarker ? cnMixHitSlop({ mode: 'before' }) : undefined,
          ])}
          as="button"
          model={model}
          value={value}
          size={mapSizeMarker[size]}
          form={mapFormMarker[form]}
          onFocus={setFocusedOn}
          onBlur={setFocusedOff}
          ref={markerRef}
          disabled={disabled}
        />
      }
      focused={focused}
    >
      {!onlyMarker && (
        <ColorPickerInput
          className={cnColorControl('Input')}
          model={model}
          value={value}
          onChange={onChange}
          size={size}
          disabled={disabled}
          format={format}
          alpha={alpha}
          id={id}
          name={name}
          view="clear"
          onFocus={setFocusedOn}
          onBlur={setFocusedOff}
        />
      )}
    </FieldControlLayout>
  );
};

export const ColorControl = forwardRef(
  ColorControlRender,
) as ColorControlComponent;
