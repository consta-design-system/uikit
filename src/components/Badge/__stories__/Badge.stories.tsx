import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconUser } from '../../../icons/IconUser/IconUser';
import { createMetadata } from '../../../utils/storybook';
import {
  Badge,
  badgePropForm,
  badgePropFormDefault,
  badgePropSize,
  badgePropSizeDefault,
  badgePropStatus,
  badgePropStatusDefault,
  badgePropView,
  badgePropViewDefault,
} from '../Badge';

import mdx from './Badge.docs.mdx';

const defaultKnobs = () => ({
  label: text('label', 'Statusing along'),
  size: select('size', badgePropSize, badgePropSizeDefault),
  view: select('view', badgePropView, badgePropViewDefault),
  status: select('status', badgePropStatus, badgePropStatusDefault),
  form: select('form', badgePropForm, badgePropFormDefault),
  minified: boolean('minified', false),
  icon: boolean('icon', false),
});

export function Playground() {
  const { label, size, view, status, form, minified, icon } = defaultKnobs();

  return (
    <div>
      <Badge
        label={label}
        size={size}
        view={view}
        status={status}
        form={form}
        minified={minified}
        icon={icon ? IconUser : undefined}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Отображение данных/Badge',
  id: 'components/Badge',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=40%3A119',
    },
  },
});
