import './ThemeExampleColors.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { presetGpnDark, presetGpnDefault, presetGpnDisplay, Theme } from '../../../Theme';

const cnExampleColors = cn('ThemeExampleColors');

export function ThemeExampleColors() {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 3 }),
        wp.decorator({ 'indent-b': 's' }),
      ])}
    >
      <Text align="center" weight="bold">
        Default
      </Text>
      <Text align="center" weight="bold">
        Dark
      </Text>
      <Text align="center" weight="bold">
        Display
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
    </div>
  );
}
