import './ThemeExampleColors.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import {
  presetGpnDark,
  presetGpnDefault,
  presetGpnDisplay,
  Theme,
} from '../../../Theme';

const cnExampleColors = cn('ThemeExampleColors');

export const ThemeExampleColors = () => {
  return (
    <Example col={{ 1: 0, 3: 800 }}>
      <>
        <Text align="center" weight="bold">
          Default
        </Text>
        <Theme preset={presetGpnDefault} className={cnExampleColors()}>
          <div className={cnExampleColors('Card')}>
            <div className={cnExampleColors('Content')}>
              <div className={cnExampleColors('Text')} />
              <div className={cnExampleColors('Text')} />
              <div className={cnExampleColors('Text')} />
              <div className={cnExampleColors('Text')} />
            </div>
            <div className={cnExampleColors('Controls')}>
              <div className={cnExampleColors('Button')} />
              <div className={cnExampleColors('Button')} />
            </div>
          </div>
        </Theme>
      </>
      <>
        <Text align="center" weight="bold">
          Dark
        </Text>
        <Theme preset={presetGpnDark} className={cnExampleColors()}>
          <div className={cnExampleColors('Card')}>
            <div className={cnExampleColors('Content')}>
              <div className={cnExampleColors('Text')} />
              <div className={cnExampleColors('Text')} />
              <div className={cnExampleColors('Text')} />
              <div className={cnExampleColors('Text')} />
            </div>
            <div className={cnExampleColors('Controls')}>
              <div className={cnExampleColors('Button')} />
              <div className={cnExampleColors('Button')} />
            </div>
          </div>
        </Theme>
      </>
      <>
        <Text align="center" weight="bold">
          Display
        </Text>
        <Theme preset={presetGpnDisplay} className={cnExampleColors()}>
          <div className={cnExampleColors('Card')}>
            <div className={cnExampleColors('Content')}>
              <div className={cnExampleColors('Text')} />
              <div className={cnExampleColors('Text')} />
              <div className={cnExampleColors('Text')} />
              <div className={cnExampleColors('Text')} />
            </div>
            <div className={cnExampleColors('Controls')}>
              <div className={cnExampleColors('Button')} />
              <div className={cnExampleColors('Button')} />
            </div>
          </div>
        </Theme>
      </>
    </Example>
  );
};
