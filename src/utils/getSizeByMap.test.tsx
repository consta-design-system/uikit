import { getSizeByMap } from './getSizeByMap';

type SizeComponent = 'm' | 's';
type SizeIcon = 's' | 'xs';

const sizeMap: Record<SizeComponent, SizeIcon> = {
  m: 's',
  s: 'xs',
};

describe('helper getSizeByMap', () => {
  it('Выборка из объекта верная', () => {
    const result = getSizeByMap(sizeMap, 'm');

    expect(result).toEqual('s');
  });
  it('при указании аргумента 3, нужно вернуть значение этого аргумента', () => {
    const result = getSizeByMap(sizeMap, 'm', 'xs');

    expect(result).toEqual('xs');
  });
});
