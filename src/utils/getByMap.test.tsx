import { getByMap } from './getByMap';

type SizeComponent = 'm' | 's';
type SizeIcon = 's' | 'xs';

const sizeMap: Record<SizeComponent, SizeIcon> = {
  m: 's',
  s: 'xs',
};

describe('helper getSizeByMap', () => {
  it('Выборка из объекта верная', () => {
    const result = getByMap(sizeMap, 'm');

    expect(result).toEqual('s');
  });
  it('при указании аргумента 3, нужно вернуть значение этого аргумента', () => {
    const result = getByMap(sizeMap, 'm', 'xs');

    expect(result).toEqual('xs');
  });
});
