import { Example } from '@consta/stand';
import React from 'react';

import GPNHeroImageSmall1xDark from '../../../__mocks__/images/Dark/HeroImage_375_1x.jpg';
import GPNHeroImageSmall2xDark from '../../../__mocks__/images/Dark/HeroImage_375_2x.jpg';
import GPNHeroImageSmall3xDark from '../../../__mocks__/images/Dark/HeroImage_375_3x.jpg';
import GPNHeroImageBig1xDark from '../../../__mocks__/images/Dark/HeroImage_720_1x.jpg';
import GPNHeroImageBig2xDark from '../../../__mocks__/images/Dark/HeroImage_720_2x.jpg';
import GPNHeroImageBig3xDark from '../../../__mocks__/images/Dark/HeroImage_720_3x.jpg';
import GPNHeroImageSmall1xDefault from '../../../__mocks__/images/Default/HeroImage_375_1x.jpg';
import GPNHeroImageSmall2xDefault from '../../../__mocks__/images/Default/HeroImage_375_2x.jpg';
import GPNHeroImageSmall3xDefault from '../../../__mocks__/images/Default/HeroImage_375_3x.jpg';
import GPNHeroImageBig1xDefault from '../../../__mocks__/images/Default/HeroImage_720_1x.jpg';
import GPNHeroImageBig2xDefault from '../../../__mocks__/images/Default/HeroImage_720_2x.jpg';
import GPNHeroImageBig3xDefault from '../../../__mocks__/images/Default/HeroImage_720_3x.jpg';
import GPNHeroImageSmall1xDisplay from '../../../__mocks__/images/Display/HeroImage_375_1x.jpg';
import GPNHeroImageSmall2xDisplay from '../../../__mocks__/images/Display/HeroImage_375_2x.jpg';
import GPNHeroImageSmall3xDisplay from '../../../__mocks__/images/Display/HeroImage_375_3x.jpg';
import GPNHeroImageBig1xDisplay from '../../../__mocks__/images/Display/HeroImage_720_1x.jpg';
import GPNHeroImageBig2xDisplay from '../../../__mocks__/images/Display/HeroImage_720_2x.jpg';
import GPNHeroImageBig3xDisplay from '../../../__mocks__/images/Display/HeroImage_720_3x.jpg';
import { Picture } from '../../../PictureCanary';

const themeMap: Record<string, string> = {
  default: 'gpnDefault',
  display: 'gpnDisplay',
  dark: 'gpnDark',
};

export const PictureExampleGetImageSettings = () => {
  const getImageSettings = (key: string) => {
    const parts = key.split('_');
    return {
      theme: themeMap[parts[0]],
      size: Number(parts[1].replace(/[^0-9.]+/g, '')),
      descriptor: parts[2],
    };
  };

  return (
    <Example>
      <Picture
        src={{
          default_0px_1x: GPNHeroImageSmall1xDefault,
          default_0px_2x: GPNHeroImageSmall2xDefault,
          default_0px_4x: GPNHeroImageSmall3xDefault,
          default_720px_1x: GPNHeroImageBig1xDefault,
          default_720px_2x: GPNHeroImageBig2xDefault,
          default_720px_4x: GPNHeroImageBig3xDefault,
          display_0px_1x: GPNHeroImageSmall1xDisplay,
          display_0px_2x: GPNHeroImageSmall2xDisplay,
          display_0px_4x: GPNHeroImageSmall3xDisplay,
          display_720px_1x: GPNHeroImageBig1xDisplay,
          display_720px_2x: GPNHeroImageBig2xDisplay,
          display_720px_4x: GPNHeroImageBig3xDisplay,
          dark_0px_1x: GPNHeroImageSmall1xDark,
          dark_0px_2x: GPNHeroImageSmall2xDark,
          dark_0px_4x: GPNHeroImageSmall3xDark,
          dark_720px_1x: GPNHeroImageBig1xDark,
          dark_720px_2x: GPNHeroImageBig2xDark,
          dark_720px_4x: GPNHeroImageBig3xDark,
        }}
        getImageSettings={getImageSettings}
      />
    </Example>
  );
};
