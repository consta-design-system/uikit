import { Example } from '@consta/stand';
import React from 'react';

// Dark 300
import ImageSmall1xDark from '../../../__mocks__/images/Dark/300 dark.png';
import ImageSmall2xDark from '../../../__mocks__/images/Dark/300 dark@2x.png';
import ImageSmall3xDark from '../../../__mocks__/images/Dark/300 dark@3x.png';
// Dark 700
import ImageMedium1xDark from '../../../__mocks__/images/Dark/700 dark.png';
import ImageMedium2xDark from '../../../__mocks__/images/Dark/700 dark@2x.png';
import ImageMedium3xDark from '../../../__mocks__/images/Dark/700 dark@3x.png';
// Dark 1000
import ImageBig1xDark from '../../../__mocks__/images/Dark/1000 dark.png';
import ImageBig2xDark from '../../../__mocks__/images/Dark/1000 dark@2x.png';
import ImageBig3xDark from '../../../__mocks__/images/Dark/1000 dark@3x.png';
// Default 300
import ImageSmall1xDefault from '../../../__mocks__/images/Default/300 default.png';
import ImageSmall2xDefault from '../../../__mocks__/images/Default/300 default@2x.png';
import ImageSmall3xDefault from '../../../__mocks__/images/Default/300 default@3x.png';
// Default 700
import ImageMedium1xDefault from '../../../__mocks__/images/Default/700 default.png';
import ImageMedium2xDefault from '../../../__mocks__/images/Default/700 default@2x.png';
import ImageMedium3xDefault from '../../../__mocks__/images/Default/700 default@3x.png';
// Default 1000
import ImageBig1xDefault from '../../../__mocks__/images/Default/1000 default.png';
import ImageBig2xDefault from '../../../__mocks__/images/Default/1000 default@2x.png';
import ImageBig3xDefault from '../../../__mocks__/images/Default/1000 default@3x.png';
// Display 300
import ImageSmall1xDisplay from '../../../__mocks__/images/Display/300 display.png';
import ImageSmall2xDisplay from '../../../__mocks__/images/Display/300 display@2x.png';
import ImageSmall3xDisplay from '../../../__mocks__/images/Display/300 display@3x.png';
// Display 700
import ImageMedium1xDisplay from '../../../__mocks__/images/Display/700 display.png';
import ImageMedium2xDisplay from '../../../__mocks__/images/Display/700 display@2x.png';
import ImageMedium3xDisplay from '../../../__mocks__/images/Display/700 display@3x.png';
// Display 1000
import ImageBig1xDisplay from '../../../__mocks__/images/Display/1000 display.png';
import ImageBig2xDisplay from '../../../__mocks__/images/Display/1000 display@2x.png';
import ImageBig3xDisplay from '../../../__mocks__/images/Display/1000 display@3x.png';
import { Picture } from '../../../PictureCanary';

export const PictureExample = () => {
  return (
    <Example>
      <Picture
        src={{
          'gpnDefault--0--1x': ImageSmall1xDefault,
          'gpnDefault--0--2x': ImageSmall2xDefault,
          'gpnDefault--0--4x': ImageSmall3xDefault,
          'gpnDefault--500--1x': ImageMedium1xDefault,
          'gpnDefault--500--2x': ImageMedium2xDefault,
          'gpnDefault--500--4x': ImageMedium3xDefault,
          'gpnDefault--1000--1x': ImageBig1xDefault,
          'gpnDefault--100--2x': ImageBig2xDefault,
          'gpnDefault--1000--4x': ImageBig3xDefault,
          'gpnDisplay--0--1x': ImageSmall1xDisplay,
          'gpnDisplay--0--2x': ImageSmall2xDisplay,
          'gpnDisplay--0--4x': ImageSmall3xDisplay,
          'gpnDisplay--500--1x': ImageMedium1xDisplay,
          'gpnDisplay--500--2x': ImageMedium2xDisplay,
          'gpnDisplay--500--4x': ImageMedium3xDisplay,
          'gpnDisplay--1000--1x': ImageBig1xDisplay,
          'gpnDisplay--100--2x': ImageBig2xDisplay,
          'gpnDisplay--1000--4x': ImageBig3xDisplay,
          'gpnDark--0--1x': ImageSmall1xDark,
          'gpnDark--0--2x': ImageSmall2xDark,
          'gpnDark--0--4x': ImageSmall3xDark,
          'gpnDark--500--1x': ImageMedium1xDark,
          'gpnDark--500--2x': ImageMedium2xDark,
          'gpnDark--500--4x': ImageMedium3xDark,
          'gpnDark--1000--1x': ImageBig1xDark,
          'gpnDark--100--2x': ImageBig2xDark,
          'gpnDark--1000--4x': ImageBig3xDark,
        }}
      />
    </Example>
  );
};
