import React, { forwardRef, useMemo } from 'react';

import { getLastPoint, useBreakpoints } from '##/hooks/useBreakpoints';

import { useTheme } from '../Theme';
import {
  defaultGetImageSettings,
  getConvertedImages,
  getSrcHash,
} from './helper';
import { PictureProps } from './types';

export const Picture = forwardRef<HTMLImageElement, PictureProps>(
  (props, ref) => {
    const {
      alt = '',
      src: srcProp,
      getImageSettings = defaultGetImageSettings,
      subscribeToRef,
      ...otherProps
    } = props;

    const { theme } = useTheme();

    const [convertedImages, sizes]: [
      Array<{
        theme?: string;
        descriptor?: string;
        src: string;
        key: string;
        size?: number;
      }>,
      Record<string, number>,
    ] = useMemo(() => {
      const images = getConvertedImages(srcProp, getImageSettings);
      return [
        images,
        images.reduce((a, { size = 0 }) => ({ ...a, [size]: size }), {}),
      ];
    }, [getSrcHash(srcProp)]);

    const activeImageSize = Number(
      getLastPoint(
        useBreakpoints({
          map: sizes,
          isActive: true,
          ref: subscribeToRef,
        }),
      ) ?? -1,
    );

    const suitableImages = useMemo(() => {
      return convertedImages
        .filter(
          ({ size, theme: targetTheme }) =>
            (!targetTheme || theme.color.primary === targetTheme) &&
            (typeof size !== 'number' || activeImageSize === size),
        )
        .sort((a, b) => {
          if (a.descriptor && b.descriptor) {
            return Number(a.descriptor.replace(/[^0-9.]+/g, '')) <
              Number(b.descriptor.replace(/[^0-9.]+/g, ''))
              ? -1
              : 1;
          }
          return 0;
        });
    }, [activeImageSize, theme, convertedImages]);

    const [src, srcSet] = useMemo(() => {
      if (suitableImages.length === 0) {
        return [];
      }
      if (suitableImages.length > 1) {
        return [
          suitableImages[0]?.src,
          suitableImages
            .map(({ src, descriptor }) => `${src} ${descriptor}`)
            .join(','),
        ];
      }
      return [suitableImages[0]?.src];
    }, [suitableImages]);

    return src ? (
      <img {...otherProps} ref={ref} alt={alt} src={src} srcSet={srcSet} />
    ) : null;
  },
);
