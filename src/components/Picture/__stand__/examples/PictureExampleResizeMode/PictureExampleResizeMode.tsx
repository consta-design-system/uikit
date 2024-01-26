import './PictureExampleResizeMode.css';

import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { cn } from '##/utils/bem';

import imageDark from '../../../__mocks__/images/Dark/700 dark.png';
import imageLight from '../../../__mocks__/images/Default/700 default.png';
import { Picture } from '../../../Picture';

const cnPictureExampleResizeMode = cn('PictureExampleResizeMode');

export const PictureExampleResizeMode = () => {
  const ref = useRef<HTMLImageElement>(null);

  return (
    <Example
      items={['window', 'component'] as ('window' | 'component')[]}
      getItemDescription={(mode) => `resizeMode="${mode}" // размер 500px`}
      col={{
        1: 0,
        2: 1000,
      }}
      getItemNode={(mode) => (
        <Picture
          className={cnPictureExampleResizeMode('Img')}
          src={{
            dark: imageDark,
            light: imageLight,
          }}
          ref={mode === 'component' ? ref : undefined}
          subscribeToRef={mode === 'component' ? ref : undefined}
          getImageSettings={(key) => {
            if (key === 'dark') {
              return {
                size: 0,
              };
            }
            return {
              size: 700,
            };
          }}
        />
      )}
    />
  );
};
