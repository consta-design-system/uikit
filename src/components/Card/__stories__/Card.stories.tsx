import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  Card,
  cardPropForm,
  cardPropFormDefault,
  cardPropSize,
  cardPropSizeDefault,
} from '../Card';

import mdx from './Card.docs.mdx';

const cardStatusMap = ['default', 'alert', 'success', 'warning'];

const defaultKnobs = () => ({
  verticalSpace: select('Vertical padding', cardPropSize, cardPropSizeDefault),
  horizontalSpace: select('Horizontal padding', cardPropSize, cardPropSizeDefault),
  shadow: boolean('Shadow', true),
  status: select('Border style', cardStatusMap, cardStatusMap[0]),
  form: select('Form', cardPropForm, cardPropFormDefault),
});

const cnCardStories = cn('cnCardStories');

export function Playground() {
  const { verticalSpace, horizontalSpace, shadow, status, form } = defaultKnobs();

  return (
    <div className={cnCardStories()}>
      <Card
        horizontalSpace={horizontalSpace}
        verticalSpace={verticalSpace}
        shadow={shadow}
        status={status}
        form={form}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Отображение данных/Card',
  id: 'components/Card',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=9601%3A151',
    },
  },
});
