import { describe, expect, test } from 'vitest';

import { getByMap } from '../getByMap';

type SizeComponent = 'm' | 's';
type SizeIcon = 's' | 'xs';

const sizeMap: Record<SizeComponent, SizeIcon> = {
  m: 's',
  s: 'xs',
};

describe('helper getSizeByMap', () => {
  test('Выборка из объекта верная', () => {
    const result = getByMap(sizeMap, 'm');

    expect(result).toEqual('s');
  });

  test('при указании аргумента 3, нужно вернуть значение этого аргумента', () => {
    const result = getByMap(sizeMap, 'm', 'xs');

    expect(result).toEqual('xs');
  });
});
