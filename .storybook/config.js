import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';
import { withThemes } from 'storybook-addon-themes';

import { DocsDecorator } from '../src/uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookRootDecorator } from '../src/uiKit/components/StoryBookRootDecorator/StoryBookRootDecorator';

const themes = [
  {
    name: 'gpnDefault',
    default: true,
    color: '#fff',
  },
  {
    name: 'gpnDark',
    color: '#22272b',
  },
  {
    name: 'gpnDisplay',
    color: '#002033',
  },
];

addParameters({
  themes: {
    list: themes,
    Decorator: StoryBookRootDecorator,
  },
  docs: {
    container: DocsDecorator,
  },
});

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withThemes);
