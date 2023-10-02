import './PictureExampleResizeMode.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import ImageDark from '../../../__mocks__/images/Dark/HeroImage_720_1x.jpg';
import ImageLight from '../../../__mocks__/images/Default/HeroImage_720_1x.jpg';
import { Picture } from '../../../PictureCanary';

const cnPictureExampleResizeMode = cn('PictureExampleResizeMode');

export const PictureExampleResizeMode = () => {
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
            dark: ImageDark,
            light: ImageLight,
          }}
          resizeMode={mode}
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
