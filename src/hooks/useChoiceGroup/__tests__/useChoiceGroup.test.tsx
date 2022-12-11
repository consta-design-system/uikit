import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { useChoiceGroup } from '../useChoiceGroup';

type CallbackWithMultiple<ITEM, EVENT> = (props: {
  e?: EVENT;
  value: ITEM[] | null;
}) => void;

type CallbackWithoutMultiple<ITEM, EVENT> = (props: {
  e?: EVENT;
  value: ITEM;
}) => void;

const getDefaultProps = (
  valueProp: number | undefined,
  onChange?: CallbackWithoutMultiple<number, React.MouseEvent>,
) => {
  const value = valueProp ?? 1;
  return {
    multiple: false as const,
    value,
    getKey: (item: number) => item.toString(),
    callBack: onChange ?? (() => {}),
  };
};

const getDefaultMultipleProps = (
  valueProp: number[] | undefined,
  onChange?: CallbackWithMultiple<number, React.MouseEvent>,
) => {
  const value = valueProp ?? [];
  return {
    multiple: true as const,
    value,
    getKey: (item: number) => item.toString(),
    callBack: onChange ?? (() => {}),
  };
};

const defaultItems = [-1, 0, 1, 2, 3];

describe('Хук useChoiceGroup', () => {
  it('должен вызываться без ошибок', () => {
    expect(() =>
      renderHook(() => useChoiceGroup(getDefaultProps(1))),
    ).not.toThrow();
  });
  describe('проверка при "multiple=false"', () => {
    it('Корректно определяет значение', () => {
      const { result } = renderHook(() => useChoiceGroup(getDefaultProps(-1)));
      const {
        current: { getChecked },
      } = result;
      expect(getChecked(defaultItems[0])).toEqual(true);
    });
    it('Корректно изменяет значение', () => {
      let variable = -1;
      const { result } = renderHook(() =>
        useChoiceGroup(
          getDefaultProps(-1, ({ value }) => {
            variable = value;
          }),
        ),
      );
      const {
        current: { getOnChange },
      } = result;
      getOnChange(1)(undefined);
      expect(variable).toEqual(1);
    });
  });
  describe('проверка при "multiple=true"', () => {
    it('Корректно определяет значение', () => {
      const { result } = renderHook(() =>
        useChoiceGroup(getDefaultMultipleProps([-1, 1])),
      );
      const {
        current: { getChecked },
      } = result;
      expect(getChecked(-1) && getChecked(1)).toEqual(true);
    });
    it('Корректно изменяет значение', () => {
      let variable: number[] | null = [-1];
      const { result } = renderHook(() =>
        useChoiceGroup(
          getDefaultMultipleProps([-1], ({ value }) => {
            variable = value;
          }),
        ),
      );
      const {
        current: { getOnChange },
      } = result;
      getOnChange(1)(undefined);
      expect(variable).toEqual([-1, 1]);
    });
  });
});
