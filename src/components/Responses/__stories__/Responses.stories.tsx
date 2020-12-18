import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Responses403 } from '../../Responses403/Responses403';
import { Responses404 } from '../../Responses404/Responses404';
import { Responses500 } from '../../Responses500/Responses500';
import { Responses503 } from '../../Responses503/Responses503';
import { ResponsesConnectionError } from '../../ResponsesConnectionError/ResponsesConnectionError';
import { ResponsesDeleted } from '../../ResponsesDeleted/ResponsesDeleted';
import { ResponsesEmptyBox } from '../../ResponsesEmptyBox/ResponsesEmptyBox';
import { ResponsesEmptyPockets } from '../../ResponsesEmptyPockets/ResponsesEmptyPockets';
import { ResponsesNothingFound } from '../../ResponsesNothingFound/ResponsesNothingFound';
import { ResponsesSuccess } from '../../ResponsesSuccess/ResponsesSuccess';
import { responsesPropSize, responsesPropSizeDefault } from '../Responses';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Responses.mdx';

const componetns = {
  Responses403,
  Responses404,
  Responses500,
  Responses503,
  ResponsesConnectionError,
  ResponsesEmptyBox,
  ResponsesEmptyPockets,
  ResponsesDeleted,
  ResponsesNothingFound,
  ResponsesSuccess,
} as const;

const componetnsNames = Object.keys(componetns) as Array<keyof typeof componetns>;

const defaultKnobs = () => ({
  component: select('Component', componetnsNames, componetnsNames[0]),
  size: select('Size', responsesPropSize, responsesPropSizeDefault),
  title: text('Title', ''),
  description: text('Description', ''),
  actions: boolean('Actions', false),
});

export function Playground() {
  const { size, title, description, component: componentName, actions } = defaultKnobs();

  const Component = componetns[componentName];

  return (
    <Component
      title={title}
      description={description}
      size={size}
      actions={actions && <Button size="m" view="ghost" label="Вернуться назад" />}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Responses',
  id: 'components/Responses',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
