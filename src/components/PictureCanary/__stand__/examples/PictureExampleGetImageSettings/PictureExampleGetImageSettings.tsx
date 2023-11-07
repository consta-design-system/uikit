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
          default_0px_1x: ImageSmall1xDefault,
          default_0px_2x: ImageSmall2xDefault,
          default_0px_4x: ImageSmall3xDefault,
          default_500px_1x: ImageMedium1xDefault,
          default_500px_2x: ImageMedium2xDefault,
          default_500px_4x: ImageMedium3xDefault,
          default_1000px_1x: ImageBig1xDefault,
          default_100px_2x: ImageBig2xDefault,
          default_1000px_4x: ImageBig3xDefault,
          display_0px_1x: ImageSmall1xDisplay,
          display_0px_2x: ImageSmall2xDisplay,
          display_0px_4x: ImageSmall3xDisplay,
          display_500px_1x: ImageMedium1xDisplay,
          display_500px_2x: ImageMedium2xDisplay,
          display_500px_4x: ImageMedium3xDisplay,
          display_1000px_1x: ImageBig1xDisplay,
          display_100px_2x: ImageBig2xDisplay,
          display_1000px_4x: ImageBig3xDisplay,
          dark_0px_1x: ImageSmall1xDark,
          dark_0px_2x: ImageSmall2xDark,
          dark_0px_4x: ImageSmall3xDark,
          dark_500px_1x: ImageMedium1xDark,
          dark_500px_2x: ImageMedium2xDark,
          dark_500px_4x: ImageMedium3xDark,
          dark_1000px_1x: ImageBig1xDark,
          dark_100px_2x: ImageBig2xDark,
          dark_1000px_4x: ImageBig3xDark,
        }}
        getImageSettings={getImageSettings}
      />
    </Example>
  );
};
