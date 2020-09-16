import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconLeaf } from '../../../icons/IconLeaf/IconLeaf';
import { createMetadata } from '../../../utils/storybook';
import {
  Informer,
  informerPropStatus,
  informerPropStatusDefault,
  informerPropView,
  informerPropViewDefault,
} from '../Informer';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Informer.mdx';

const defaultKnobs = () => ({
  status: select('status', informerPropStatus, informerPropStatusDefault),
  title: text('title', 'Some title'),
  label: text('label', 'Hey there! I am Informer. Be ready to be informed :)'),
  view: select('view', informerPropView, informerPropViewDefault),
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
