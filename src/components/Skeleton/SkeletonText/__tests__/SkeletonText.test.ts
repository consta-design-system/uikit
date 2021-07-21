import { getRowWidth } from '../SkeletonText';

describe('getRowWidth', () => {
  it('возвращает 50%, если это единственная строка', () => {
    expect(getRowWidth(0, 1)).toBe('50%');
  });

  it('возвращает 50%, если это последняя строка', () => {
    expect(getRowWidth(1, 2)).toBe('50%');
    expect(getRowWidth(9, 10)).toBe('50%');
  });

  it('возвращает полную ширину, если это первая строка из тройки', () => {
    expect(getRowWidth(0, 10)).toBe('100%');
    expect(getRowWidth(3, 10)).toBe('100%');
    expect(getRowWidth(6, 10)).toBe('100%');
  });

  it('возвращает 85%, если это вторая строка из тройки', () => {
    expect(getRowWidth(1, 10)).toBe('85%');
    expect(getRowWidth(4, 10)).toBe('85%');
    expect(getRowWidth(7, 10)).toBe('85%');
  });

  it('возвращает 93%, если это третья строка из тройки', () => {
    expect(getRowWidth(2, 10)).toBe('93%');
    expect(getRowWidth(5, 10)).toBe('93%');
    expect(getRowWidth(8, 10)).toBe('93%');
  });
});
