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
          default_1px_1x: imageSmall1xDefault,
          default_1px_2x: imageSmall2xDefault,
          default_1px_4x: imageSmall3xDefault,
          default_500px_1x: imageMedium1xDefault,
          default_500px_2x: imageMedium2xDefault,
          default_500px_4x: imageMedium3xDefault,
          default_1000px_1x: imageBig1xDefault,
          default_1000px_2x: imageBig2xDefault,
          default_1000px_4x: imageBig3xDefault,
          display_1px_1x: imageSmall1xDisplay,
          display_1px_2x: imageSmall2xDisplay,
          display_1px_4x: imageSmall3xDisplay,
          display_500px_1x: imageMedium1xDisplay,
          display_500px_2x: imageMedium2xDisplay,
          display_500px_4x: imageMedium3xDisplay,
          display_1000px_1x: imageBig1xDisplay,
          display_1000px_2x: imageBig2xDisplay,
          display_1000px_4x: imageBig3xDisplay,
          dark_1px_1x: imageSmall1xDark,
          dark_1px_2x: imageSmall2xDark,
          dark_1px_4x: imageSmall3xDark,
          dark_500px_1x: imageMedium1xDark,
          dark_500px_2x: imageMedium2xDark,
          dark_500px_4x: imageMedium3xDark,
          dark_1000px_1x: imageBig1xDark,
          dark_1000px_2x: imageBig2xDark,
          dark_1000px_4x: imageBig3xDark,
        }}
        getImageSettings={getImageSettings}
      />
    </Example>
  );
};
