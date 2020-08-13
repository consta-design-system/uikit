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

const storySort = (a, b) => {
  const orderA = a[1].parameters.order;
  const orderB = b[1].parameters.order;
  const idA = a[0];
  const idB = b[0];

  if (orderA && orderB) {
    return orderA - orderB;
  }
  if (orderA) {
    return -1;
  }
  if (orderB) {
    return 1;
  }
  if (idA < idB) {
    return -1;
  }
  if (idA > idB) {
    return 1;
  }
  return 0;
};

addParameters({
  themes: {
    list: themes,
    Decorator: StoryBookRootDecorator,
  },
  docs: {
    container: DocsDecorator,
  },
  options: {
    storySort,
  },
});

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withThemes);
