import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconLeaf } from '../../../icons/IconLeaf/IconLeaf';
import { createMetadata } from '../../../utils/storybook';
import { Informer } from '../Informer';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Informer.mdx';

const defaultKnobs = () => ({
  status: select('status', ['system', 'alert', 'warning', 'success'], 'success'),
  title: text('title', 'Some title'),
  label: text('label', 'Hey there! I am Informer. Be ready to be informed :)'),
  view: select('view', ['filled', 'bordered'], 'filled'),
  icon: boolean('icon', false),
});

export function Playground() {
  const { status, title, label, view, icon } = defaultKnobs();

  return (
    <Informer
      status={status}
      title={title}
      label={label}
      view={view}
      icon={icon ? IconLeaf : undefined}
    />
  );
}

export default createMetadata({
  title: 'Components|/Informer',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
