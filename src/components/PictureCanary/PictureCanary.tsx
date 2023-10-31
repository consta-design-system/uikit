import React, { forwardRef, useMemo } from 'react';

import { getLastPoint, useBreakpoints } from '##/hooks/useBreakpoints';
import { cnCanary } from '##/utils/bem';

import { useTheme } from '../Theme';
import { defaultGetImageSettings, getConvertedImages } from './helper';
import { PictureProps } from './types';

const cnPicture = cnCanary('Picture');

export const Picture = forwardRef<HTMLImageElement, PictureProps>(
  (props, ref) => {
    const {
      alt = '',
      src: srcProp,
      getImageSettings = defaultGetImageSettings,
      resizeContainer = window,
      className,
      ...otherProps
    } = props;

    const { theme } = useTheme();

    const convertedImages: Array<{
      theme?: string;
      descriptor?: string;
      src: string;
      key: string;
      size?: number;
    }> = useMemo(
      () => getConvertedImages(srcProp, getImageSettings),
      [srcProp],
    );

    const sizes = useMemo(
      () =>
        convertedImages.reduce(
          (a, { size = 0 }) => ({ ...a, [size]: size }),
          {},
        ),
      [convertedImages],
    );

    const activeImageSize = Number(
      getLastPoint(
        useBreakpoints({
          map: sizes,
          isActive: true,
          ref: resizeContainer instanceof Window ? undefined : resizeContainer,
        }),
      ),
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

    const { src, srcSet } = useMemo(() => {
      if (suitableImages.length === 0) {
        return {};
      }
      if (suitableImages.length > 1) {
        return {
          src: suitableImages[0]?.src,
          srcSet: suitableImages
            .map(({ src, descriptor }) => `${src} ${descriptor}`)
            .join(','),
        };
      }
      return {
        src: suitableImages[0]?.src,
      };
    }, [suitableImages]);

    return src ? (
      <img
        alt={alt}
        src={src}
        className={cnPicture(null, [className])}
        srcSet={srcSet}
        ref={ref}
        {...otherProps}
      />
    ) : null;
  },
);
