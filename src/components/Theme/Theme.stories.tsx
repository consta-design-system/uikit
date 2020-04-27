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
import { withDocs } from '@storybook-addons/docs';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { cnTheme } from './Theme';

storiesOf('UI-KIT|/Theme', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withDocs({
      readme: {
        content: require('./Theme.md')['default'],
      },
    })
  )
  .add('documentation', () => (
    <div
      className={cnTheme({
        color: 'gpnDefault',
        control: 'gpnDefault',
        font: 'gpnDefault',
        size: 'gpnDefault',
        space: 'gpnDefault',
        gap: 'm',
      })}
    />
  ));
