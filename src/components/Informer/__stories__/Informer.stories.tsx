import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconLeaf } from '../../../icons/IconLeaf/IconLeaf';
import { createMetadata } from '../../../utils/storybook';
import {
  Informer,
  informerPropSiseDefault,
  informerPropSize,
  informerPropStatus,
  informerPropStatusDefault,
  informerPropView,
  informerPropViewDefault,
} from '../Informer';

import mdx from './Informer.docs.mdx';

const defaultKnobs = () => ({
  status: select('status', informerPropStatus, informerPropStatusDefault),
  title: text('title', 'Some title'),
  label: text('label', 'Hey there! I am Informer. Be ready to be informed :)'),
  view: select('view', informerPropView, informerPropViewDefault),
  size: select('size', informerPropSize, informerPropSiseDefault),
  icon: boolean('icon', false),
});

export function Playground() {
  const { status, title, label, view, icon, size } = defaultKnobs();

  return (
    <Informer
      size={size}
      status={status}
      title={title}
      label={label}
      view={view}
      icon={icon ? IconLeaf : undefined}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Обратная связь/Informer',
  id: 'components/Informer',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A29120',
    },
  },
});
