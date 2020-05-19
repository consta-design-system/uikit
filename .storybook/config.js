import requireContext from 'require-context.macro';
import { addParameters, configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withThemes } from 'storybook-addon-themes';
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
});

addDecorator(withA11y);

addDecorator((story) => {
  return story();
});

addDecorator(withThemes);
