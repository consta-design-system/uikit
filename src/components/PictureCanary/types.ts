import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type PicturePropGetImageSettings = (image: string) => {
  theme?: string;
  size?: number;
  descriptor?: string;
};

export type PicturePropSrc = string | Record<string, string>;

export type PictureProps = PropsWithHTMLAttributesAndRef<
  {
    alt?: string;
    src: PicturePropSrc;
    getImageSettings?: PicturePropGetImageSettings;
    resizeContainer?:
      | Window
      | React.RefObject<HTMLElement | SVGGraphicsElement>;
  },
  HTMLImageElement
>;
