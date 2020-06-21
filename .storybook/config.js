import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';
import { withThemes } from 'storybook-addon-themes';

import { StoryBookRootDecorator } from '../src/uiKit/components/StoryBookRootDecorator/StoryBookRootDecorator';
import { StoryBookRootDocsDecorator } from '../src/uiKit/components/StoryBookRootDocsDecorator/StoryBookRootDocsDecorator';

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
    container: StoryBookRootDocsDecorator,
  },
});

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withThemes);
