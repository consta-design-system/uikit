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
import { ResponsesExit } from '../../ResponsesExit/ResponsesExit';
import { ResponsesNothingFound } from '../../ResponsesNothingFound/ResponsesNothingFound';
import { ResponsesSuccess } from '../../ResponsesSuccess/ResponsesSuccess';
import { responsesPropSize, responsesPropSizeDefault } from '../Responses';

import mdx from './Responses.docs.mdx';

const components = {
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
  ResponsesExit,
} as const;

const componentsNames = Object.keys(components) as Array<keyof typeof components>;

const defaultKnobs = () => ({
  component: select('Component', componentsNames, componentsNames[0]),
  size: select('Size', responsesPropSize, responsesPropSizeDefault),
  title: text('Title', ''),
  description: text('Description', ''),
  actions: boolean('Actions', false),
});

export function Playground() {
  const { size, title, description, component: componentName, actions } = defaultKnobs();

  const Component = components[componentName];

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
  title: 'Компоненты|/Обратная связь/Responses',
  id: 'components/Responses',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=6263%3A116157',
    },
  },
});
