import { Example } from '@consta/stand';
import React from 'react';

// Dark 300
import imageSmall1xDark from '../../../__mocks__/images/Dark/300 dark.png';
import imageSmall2xDark from '../../../__mocks__/images/Dark/300 dark@2x.png';
import imageSmall3xDark from '../../../__mocks__/images/Dark/300 dark@3x.png';
// Dark 700
import imageMedium1xDark from '../../../__mocks__/images/Dark/700 dark.png';
import imageMedium2xDark from '../../../__mocks__/images/Dark/700 dark@2x.png';
import imageMedium3xDark from '../../../__mocks__/images/Dark/700 dark@3x.png';
// Dark 1000
import imageBig1xDark from '../../../__mocks__/images/Dark/1000 dark.png';
import imageBig2xDark from '../../../__mocks__/images/Dark/1000 dark@2x.png';
import imageBig3xDark from '../../../__mocks__/images/Dark/1000 dark@3x.png';
// Default 300
import imageSmall1xDefault from '../../../__mocks__/images/Default/300 default.png';
import imageSmall2xDefault from '../../../__mocks__/images/Default/300 default@2x.png';
import imageSmall3xDefault from '../../../__mocks__/images/Default/300 default@3x.png';
// Default 700
import imageMedium1xDefault from '../../../__mocks__/images/Default/700 default.png';
import imageMedium2xDefault from '../../../__mocks__/images/Default/700 default@2x.png';
import imageMedium3xDefault from '../../../__mocks__/images/Default/700 default@3x.png';
// Default 1000
import imageBig1xDefault from '../../../__mocks__/images/Default/1000 default.png';
import imageBig2xDefault from '../../../__mocks__/images/Default/1000 default@2x.png';
import imageBig3xDefault from '../../../__mocks__/images/Default/1000 default@3x.png';
// Display 300
import imageSmall1xDisplay from '../../../__mocks__/images/Display/300 display.png';
import imageSmall2xDisplay from '../../../__mocks__/images/Display/300 display@2x.png';
import imageSmall3xDisplay from '../../../__mocks__/images/Display/300 display@3x.png';
// Display 700
import imageMedium1xDisplay from '../../../__mocks__/images/Display/700 display.png';
import imageMedium2xDisplay from '../../../__mocks__/images/Display/700 display@2x.png';
import imageMedium3xDisplay from '../../../__mocks__/images/Display/700 display@3x.png';
// Display 1000
import imageBig1xDisplay from '../../../__mocks__/images/Display/1000 display.png';
import imageBig2xDisplay from '../../../__mocks__/images/Display/1000 display@2x.png';
import imageBig3xDisplay from '../../../__mocks__/images/Display/1000 display@3x.png';
import { Picture } from '../../../Picture';

export const PictureExample = () => {
  return (
    <Example>
      <Picture
        src={{
          'gpnDefault--0--1x': imageSmall1xDefault,
          'gpnDefault--0--2x': imageSmall2xDefault,
          'gpnDefault--0--4x': imageSmall3xDefault,
          'gpnDefault--500--1x': imageMedium1xDefault,
          'gpnDefault--500--2x': imageMedium2xDefault,
          'gpnDefault--500--4x': imageMedium3xDefault,
          'gpnDefault--1000--1x': imageBig1xDefault,
          'gpnDefault--1000--2x': imageBig2xDefault,
          'gpnDefault--1000--4x': imageBig3xDefault,
          'gpnDisplay--0--1x': imageSmall1xDisplay,
          'gpnDisplay--0--2x': imageSmall2xDisplay,
          'gpnDisplay--0--4x': imageSmall3xDisplay,
          'gpnDisplay--500--1x': imageMedium1xDisplay,
          'gpnDisplay--500--2x': imageMedium2xDisplay,
          'gpnDisplay--500--4x': imageMedium3xDisplay,
          'gpnDisplay--1000--1x': imageBig1xDisplay,
          'gpnDisplay--1000--2x': imageBig2xDisplay,
          'gpnDisplay--1000--4x': imageBig3xDisplay,
          'gpnDark--0--1x': imageSmall1xDark,
          'gpnDark--0--2x': imageSmall2xDark,
          'gpnDark--0--4x': imageSmall3xDark,
          'gpnDark--500--1x': imageMedium1xDark,
          'gpnDark--500--2x': imageMedium2xDark,
          'gpnDark--500--4x': imageMedium3xDark,
          'gpnDark--1000--1x': imageBig1xDark,
          'gpnDark--1000--2x': imageBig2xDark,
          'gpnDark--1000--4x': imageBig3xDark,
        }}
      />
    </Example>
  );
};
