import { addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withThemes } from 'storybook-addon-themes';
import { withKnobs } from '@storybook/addon-knobs';
import { DocsContainer } from '@storybook/addon-docs/blocks';
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
    container: DocsContainer,
  },
});

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withThemes);
