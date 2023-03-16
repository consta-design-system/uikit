import IMask from 'imask';
import { useCallback, useEffect, useRef } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';

type Props<MASK extends IMask.AnyMaskedOptions> = {
  value: string | null;
  onChange?: (
    value: string | null,
    params: { e: Event; value: string | null },
  ) => void;
  maskOptions: string | MASK;
};
export function useIMask<MASK extends IMask.AnyMaskedOptions>(
  props: Props<MASK>,
) {
  const { value, maskOptions, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const imaskRef = useRef<IMask.InputMask<MASK> | null>(null);
  const handleChanheRef = useMutableRef(onChange);

  // Нужно для синхранизации value c Imask,
  // так как value мы можем задать через пропс без самого ввода,
  // и Imask требует ручной синхронихации в этом случае
  const onAcept = useCallback((e: Event) => {
    const value = imaskRef.current?.value || null;
    handleChanheRef.current?.(value, { e, value });
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      const options = (
        typeof maskOptions === 'string' ? { mask: maskOptions } : maskOptions
      ) as MASK;
      if (imaskRef.current) {
        imaskRef.current.updateOptions(options);
      } else {
        imaskRef.current = IMask(inputRef.current, options);
      }
    }
  }, [inputRef.current, maskOptions]);

  useEffect(() => {
    if (imaskRef.current && inputRef.current && imaskRef.current.el) {
      imaskRef.current.updateValue();
    }
  }, [value]);

  useEffect(() => {
    imaskRef.current?.on('accept', onAcept);
    return () => {
      imaskRef.current?.off('accept', onAcept);
    };
  }, []);

  useEffect(() => {
    return () => {
      imaskRef.current?.destroy();
    };
  }, []);

  return {
    inputRef,
    imaskRef,
  };
}
