import { mapping, sortObj } from '../mapping';

describe('useBreakpoints', () => {
  it('sortObj', () => {
    const result = sortObj({
      desktop: 1000,
      mobile: 0,
      tablet: 800,
    });

    const expected: typeof result = {
      mobile: 0,
      tablet: 800,
      desktop: 1000,
    };

    expect(Object.keys(result).join('-')).toEqual(
      Object.keys(expected).join('-'),
    );
  });

  it('mapping', () => {
    const result = mapping(802, {
      desktop: 1000,
      mobile: 0,
      tablet: 800,
    });

    const expected: typeof result = {
      mobile: true,
      tablet: true,
      desktop: false,
    };

    expect(result).toEqual(expected);
  });
});
