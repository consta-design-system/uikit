import { formatAccept } from '../formatAccept';

describe('formatAccept', () => {
  it('returns undefined for empty accept', () => {
    expect(formatAccept(undefined)).toBeUndefined();
  });

  it('adds lower/upper case variants for extension list', () => {
    expect(formatAccept(['.png'])).toEqual({ '*': ['.png', '.PNG'] });
  });

  it('supports comma-separated accept values', () => {
    expect(formatAccept('.png, image/jpeg')).toEqual({
      '*': ['.png', '.PNG', 'image/jpeg', 'IMAGE/JPEG'],
    });
  });

  it('deduplicates identical values', () => {
    expect(formatAccept(['.PNG', '.png'])).toEqual({ '*': ['.png', '.PNG'] });
  });
});
