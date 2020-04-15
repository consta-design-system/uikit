import '../../utils/whitepaper/whitepaper.css';
import './Theme.css';
import './_color/Theme_color_gpnDark.css';
import './_color/Theme_color_gpnDefault.css';
import './_color/Theme_color_gpnDisplay.css';
import './_control/Theme_control_gpnDefault.css';
import './_font/theme_font_gpnDefault.css';
import './_size/Theme_size_gpnDefault.css';
import './_space/Theme_space_gpnDefault.css';
import './_gap/Theme_gap_l.css';
import './_gap/Theme_gap_m.css';
import './_gap/Theme_gap_s.css';

import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Text } from '../Text/Text';

import { cnTheme } from './Theme';

storiesOf('Theme', module)
  .addDecorator(withKnobs)
  .add('Theme', () => (
    <div
      className={cnTheme({
        color: 'gpnDefault',
        control: 'gpnDefault',
        font: 'gpnDefault',
        size: 'gpnDefault',
        space: 'gpnDefault',
        gap: 'm',
      })}
    >
      <Text> Текст </Text>
      <Text className={cnTheme({ color: 'gpnDark' })}> Текст </Text>
    </div>
  ));
