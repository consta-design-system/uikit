import { useCallback, useEffect, useRef, useState } from 'react';

import { ColorModel, HsvaColor } from '../types';
import { equalColorObjects } from '../utils/compare';
import { useEventCallback } from './useEventCallback';

export function useColorManipulation<T>(
  colorModel: ColorModel<T>,
  color: T,
  onChange?: (color: T) => void,
): [HsvaColor, (color: Partial<HsvaColor>) => void] {
  const onChangeCallback = useEventCallback<T>(onChange);

  const [hsva, updateHsva] = useState<HsvaColor>(() =>
    colorModel.toHsva(color),
  );

  const cache = useRef({ color, hsva });

  useEffect(() => {
    if (!colorModel.equal(color, cache.current.color)) {
      const newHsva = colorModel.toHsva(color);
      cache.current = { hsva: newHsva, color };
      updateHsva(newHsva);
    }
  }, [color, colorModel]);

  useEffect(() => {
    let newColor;
    if (
      !equalColorObjects(hsva, cache.current.hsva) &&
      !colorModel.equal(
        (newColor = colorModel.fromHsva(hsva)),
        cache.current.color,
      )
    ) {
      cache.current = { hsva, color: newColor };
      onChangeCallback(newColor);
    }
  }, [hsva, colorModel, onChangeCallback]);

  const handleChange = useCallback((params: Partial<HsvaColor>) => {
    updateHsva((current) => ({ ...current, ...params }));
  }, []);

  return [hsva, handleChange];
}
