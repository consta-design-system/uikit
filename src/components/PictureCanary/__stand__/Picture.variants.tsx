import { useSelect, useText } from '@consta/stand';
import React from 'react';

import { Picture } from '##/components/PictureCanary';

import GPNHeroImageSmall1xDark from '../__mocks__/images/Dark/HeroImage_375_1x.jpg';
import GPNHeroImageSmall2xDark from '../__mocks__/images/Dark/HeroImage_375_2x.jpg';
import GPNHeroImageSmall3xDark from '../__mocks__/images/Dark/HeroImage_375_3x.jpg';
import GPNHeroImageBig1xDark from '../__mocks__/images/Dark/HeroImage_720_1x.jpg';
import GPNHeroImageBig2xDark from '../__mocks__/images/Dark/HeroImage_720_2x.jpg';
import GPNHeroImageBig3xDark from '../__mocks__/images/Dark/HeroImage_720_3x.jpg';
import GPNHeroImageSmall1xDefault from '../__mocks__/images/Default/HeroImage_375_1x.jpg';
import GPNHeroImageSmall2xDefault from '../__mocks__/images/Default/HeroImage_375_2x.jpg';
import GPNHeroImageSmall3xDefault from '../__mocks__/images/Default/HeroImage_375_3x.jpg';
import GPNHeroImageBig1xDefault from '../__mocks__/images/Default/HeroImage_720_1x.jpg';
import GPNHeroImageBig2xDefault from '../__mocks__/images/Default/HeroImage_720_2x.jpg';
import GPNHeroImageBig3xDefault from '../__mocks__/images/Default/HeroImage_720_3x.jpg';
import GPNHeroImageSmall1xDisplay from '../__mocks__/images/Display/HeroImage_375_1x.jpg';
import GPNHeroImageSmall2xDisplay from '../__mocks__/images/Display/HeroImage_375_2x.jpg';
import GPNHeroImageSmall3xDisplay from '../__mocks__/images/Display/HeroImage_375_3x.jpg';
import GPNHeroImageBig1xDisplay from '../__mocks__/images/Display/HeroImage_720_1x.jpg';
import GPNHeroImageBig2xDisplay from '../__mocks__/images/Display/HeroImage_720_2x.jpg';
import GPNHeroImageBig3xDisplay from '../__mocks__/images/Display/HeroImage_720_3x.jpg';

const Variants = () => {
  const resizeMode = useSelect('resizeMode', ['window', 'component'], 'window');
  const title = useText('title', 'Заголовок');
  const alt = useText('alt', 'Заголовок');

  return (
    <Picture
      alt={alt}
      title={title}
      resizeMode={resizeMode}
      src={{
        'gpnDefault--0--1x': GPNHeroImageSmall1xDefault,
        'gpnDefault--0--2x': GPNHeroImageSmall2xDefault,
        'gpnDefault--0--4x': GPNHeroImageSmall3xDefault,
        'gpnDefault--720--1x': GPNHeroImageBig1xDefault,
        'gpnDefault--720--2x': GPNHeroImageBig2xDefault,
        'gpnDefault--720--4x': GPNHeroImageBig3xDefault,
        'gpnDisplay--0--1x': GPNHeroImageSmall1xDisplay,
        'gpnDisplay--0--2x': GPNHeroImageSmall2xDisplay,
        'gpnDisplay--0--4x': GPNHeroImageSmall3xDisplay,
        'gpnDisplay--720--1x': GPNHeroImageBig1xDisplay,
        'gpnDisplay--720--2x': GPNHeroImageBig2xDisplay,
        'gpnDisplay--720--4x': GPNHeroImageBig3xDisplay,
        'gpnDark--0--1x': GPNHeroImageSmall1xDark,
        'gpnDark--0--2x': GPNHeroImageSmall2xDark,
        'gpnDark--0--4x': GPNHeroImageSmall3xDark,
        'gpnDark--720--1x': GPNHeroImageBig1xDark,
        'gpnDark--720--2x': GPNHeroImageBig2xDark,
        'gpnDark--720--4x': GPNHeroImageBig3xDark,
      }}
    />
  );
};

export default Variants;
