import './ColorPickerVariants.css';

import { useBoolean, useSelect, useText } from '@consta/stand';
import React, { useMemo, useRef, useState } from 'react';

import { ChipsChoice } from '##/components/Chips';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';
import { keys } from '##/utils/object/keys';

import {
  ColorControl,
  ColorInputFormat,
  ColorMarker,
  ColorPalette,
  ColorPicker,
  ColorPickerBase,
  ColorPickerInput,
  hexAlphaModel,
  HslaColor,
  hslaModel,
} from '..';
import { generateHslaPalette } from './generateHslaPalette';

export const ColorPickerBaseVariants = () => {
  const [color, setColor] = useState<HslaColor>({
    h: 0,
    s: 100,
    l: 50,
    a: 1,
  });

  return (
    <ColorPickerBase
      onChange={setColor}
      model={hslaModel}
      value={color}
      alpha
    />
  );
};

export const ColorMarkerVariants = () => {
  const size = useSelect('size', ['xs', 's', 'm', 'l'], 'm');
  const withoutColor = useBoolean('withoutColor', false);
  const active = useBoolean('active', false);
  const form = useSelect('form', ['default', 'brick', 'round'], 'default');

  return (
    <ColorMarker
      size={size}
      model={hslaModel}
      value={withoutColor ? undefined : { h: 186, s: 39, l: 38, a: 0.5 }}
      as="button"
      active={active}
      form={form}
    />
  );
};

export const ColorPickerVariants = () => {
  const markerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<HslaColor>({ h: 0, s: 100, l: 50, a: 1 });
  const paletteArray = useMemo(() => generateHslaPalette(33), []);

  const withAnchor = useBoolean('withAnchor', true);
  const header = useText('header', 'Выбор цвета');
  const mainControl = useBoolean('mainControl', true);
  const palette = useBoolean('palette', true);
  const paletteTitle = useText('paletteTitle', 'Ранее использованные', palette);
  const alpha = useBoolean('alpha', true);
  const withFormat = useSelect(
    'withFormat',
    ['multiple', 'single', 'false'],
    'multiple',
  );

  const formatMap = {
    multiple: ['rgb', 'hex', 'hsl', 'hsv'] as ColorInputFormat[],
    single: 'hsl' as ColorInputFormat,
    false: false,
  } as const;

  return (
    <>
      {withAnchor && (
        <ColorControl
          model={hslaModel}
          markerRef={markerRef}
          ref={rootRef}
          value={value}
          onChange={setValue}
          alpha={alpha}
        />
      )}
      <ColorPicker
        value={value}
        model={hslaModel}
        anchorRef={withAnchor ? rootRef : undefined}
        controlRef={withAnchor ? markerRef : undefined}
        onChange={setValue}
        header={header}
        alpha={alpha}
        palette={palette ? paletteArray : undefined}
        paletteTitle={paletteTitle}
        mainControl={mainControl}
        format={formatMap[withFormat || 'multiple']}
      />
    </>
  );
};

export const ColorPaletteVariants = () => {
  const size = useSelect('size', ['xs', 's', 'm', 'l'], 'm');
  const form = useSelect('form', ['default', 'brick', 'round'], 'default');

  const items = useMemo(() => generateHslaPalette(60), []);
  const [color, setColor] = useState<HslaColor | undefined>();

  return (
    <ColorPalette
      size={size}
      model={hslaModel}
      items={items}
      value={color}
      onChange={setColor}
      form={form}
    />
  );
};

export const ColorPickerInputVariants = () => {
  const size = useSelect('size', ['xs', 's', 'm', 'l'], 'm');
  const format = useSelect('format', ['rgb', 'hsl', 'hex', 'hsv'], 'hex');
  const alpha = useBoolean('alpha', true);
  const view = useSelect('view', ['default', 'clear'], 'default');
  const form = useSelect(
    'form',
    [
      'default',
      'defaultClear',
      'defaultBrick',
      'brick',
      'brickDefault',
      'brickClear',
      'brickRound',
      'round',
      'roundClear',
      'roundBrick',
      'clearRound',
      'clearDefault',
      'clearBrick',
      'clear',
    ],
    'default',
  );
  const disabled = useBoolean('disabled', false);

  const [color, setColor] = useState<string | undefined>();

  return (
    <ColorPickerInput
      size={size}
      model={hexAlphaModel}
      value={color}
      format={format}
      alpha={alpha}
      disabled={disabled}
      view={view}
      id="color-picker-input"
      name="color-picker-input"
      onChange={setColor}
      form={form}
    />
  );
};

export const ColorControlVariants = () => {
  const size = useSelect('size', ['xs', 's', 'm', 'l'], 'm');
  const format = useSelect('format', ['rgb', 'hsl', 'hex', 'hsv'], 'hex');
  const alpha = useBoolean('alpha', true);
  const disabled = useBoolean('disabled');
  const view = useSelect('view', ['default', 'clear'], 'default');
  const onlyMarker = useBoolean('onlyMarker');
  const form = useSelect(
    'form',
    [
      'default',
      'defaultClear',
      'defaultBrick',
      'brick',
      'brickDefault',
      'brickClear',
      'brickRound',
      'round',
      'roundClear',
      'roundBrick',
      'clearRound',
      'clearDefault',
      'clearBrick',
      'clear',
    ],
    'default',
  );

  const [color, setColor] = useState<string | undefined>();

  return (
    <ColorControl
      size={size}
      model={hexAlphaModel}
      value={color}
      format={format}
      alpha={alpha}
      disabled={disabled}
      id="color-picker-input"
      name="color-picker-input"
      onChange={setColor}
      view={view}
      form={form}
      onlyMarker={onlyMarker}
    />
  );
};

const mapComponent = {
  ColorPicker: ColorPickerVariants,
  ColorControl: ColorControlVariants,
  ColorPickerInput: ColorPickerInputVariants,
  ColorPickerBase: ColorPickerBaseVariants,
  ColorMarker: ColorMarkerVariants,
  ColorPalette: ColorPaletteVariants,
};

const keysComponent = keys(mapComponent);

const defaultComponent = keysComponent[0];

const cnColorPickerVariants = cn('ColorPickerVariants');
const getItem = (item: keyof typeof mapComponent) => item;

const Variants = () => {
  const [component, setComponent] = useState(defaultComponent);

  const Component = mapComponent[component];

  return (
    <div className={cnColorPickerVariants()}>
      <div
        className={cnColorPickerVariants('Header', [
          cnMixScrollBar({ invisible: true }),
        ])}
      >
        <div className={cnColorPickerVariants('ChoiceWrapper')}>
          <ChipsChoice
            className={cnColorPickerVariants('Choice')}
            size="xs"
            getItemLabel={getItem}
            getItemKey={getItem}
            items={keysComponent}
            value={component}
            onChange={setComponent}
          />
        </div>
      </div>
      <div className={cnColorPickerVariants('Body', [cnMixScrollBar()])}>
        <Component />
      </div>
    </div>
  );
};

export default Variants;
