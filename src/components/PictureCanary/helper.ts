import { PicturePropGetImageSettings, PicturePropSrc } from './types';

export const defaultGetImageSettings: PicturePropGetImageSettings = (image) => {
  const parts = image.split('--');
  return {
    theme: parts[0],
    size: Number(parts[1]),
    descriptor: parts[2],
  };
};

export const getConvertedImages = (
  src: PicturePropSrc,
  getImageSettings: PicturePropGetImageSettings,
): Array<{
  theme?: string;
  descriptor?: string;
  src: string;
  key: string;
  size?: number;
}> => {
  if (typeof src === 'string') {
    return [
      {
        src,
        key: src,
      },
    ];
  }
  return Object.keys(src).map((key) => ({
    ...getImageSettings(key),
    key,
    src: src[key],
  }));
};
