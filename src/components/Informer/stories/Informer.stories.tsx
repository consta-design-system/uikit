import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconLeaf } from '../../../icons/IconLeaf/IconLeaf';
import { cn } from '../../../utils/bem';
import { Informer } from '../Informer';

import mdx from './Informer.mdx';

const defaultKnobs = () => ({
  status: select('status', ['system', 'alert', 'warning', 'success'], 'success'),
  title: text('title', 'Some title'),
  label: text('label', 'Hey there! I am Informer. Be ready to be informed :)'),
  view: select('view', ['filled', 'bordered'], 'filled'),
  icon: boolean('icon', false),
});

const cnInformerStories = cn('InformerStories');

export function Playground() {
  const { status, title, label, view, icon } = defaultKnobs();

  return (
    <div className={cnInformerStories()}>
      <Informer
        status={status}
        title={title}
        label={label}
        view={view}
        icon={icon ? IconLeaf : null}
      />
    </div>
  );
}

export default {
  title: 'UI-KIT|/Informer',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
