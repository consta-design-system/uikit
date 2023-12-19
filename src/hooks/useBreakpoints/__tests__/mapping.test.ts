import { mapping, sortObj } from '../mapping';

describe('useBreakpoints', () => {
  it('sortObj', () => {
    const result = sortObj({
      desctop: 1000,
      mobile: 0,
      tablet: 800,
    });

    const expected: typeof result = {
      mobile: 0,
      tablet: 800,
      desctop: 1000,
    };

    expect(Object.keys(result).join('-')).toEqual(
      Object.keys(expected).join('-'),
    );
  });

  it('mapping', () => {
    const result = mapping(802, {
      desctop: 1000,
      mobile: 0,
      tablet: 800,
    });

    const expected: typeof result = {
      mobile: true,
      tablet: true,
      desctop: false,
    };

    expect(result).toEqual(expected);
  });
});
