import { useBoolean, useSelect, useText } from '@consta/stand';
import * as React from 'react';

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

const componentsNames = Object.keys(components) as Array<
  keyof typeof components
>;

const Variants = () => {
  const component =
    useSelect('Component', componentsNames, componentsNames[0]) ||
    componentsNames[0];
  const size = useSelect('Size', responsesPropSize, responsesPropSizeDefault);
  const title = useText('Title', '');
  const description = useText('Description', '');
  const actions = useBoolean('Actions', false);

  const Component = components[component] || componentsNames[0];

  return (
    <Component
      title={title}
      description={description}
      size={size}
      actions={
        actions && <Button size="m" view="ghost" label="Вернуться назад" />
      }
    />
  );
};

export default Variants;
