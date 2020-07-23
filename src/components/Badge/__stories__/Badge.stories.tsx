import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconUser } from '../../../icons/IconUser/IconUser';
import { createMetadata } from '../../../utils/storybook';
import { Badge } from '../Badge';

import mdx from './Badge.mdx';

const defaultKnobs = () => ({
  label: text('label', 'Statusing along'),
  size: select('size', ['s', 'm', 'l'], 'm'),
  view: select('view', ['filled', 'stroked'], 'filled'),
  status: select('status', ['success', 'error', 'warning', 'normal', 'system'], 'success'),
  form: select('form', ['default', 'round'], 'default'),
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
        icon={icon ? IconUser : null}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Components|/Badge',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
