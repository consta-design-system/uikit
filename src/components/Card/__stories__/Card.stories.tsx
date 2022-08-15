import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  Card,
  cardPropForm,
  cardPropFormDefault,
  cardPropSpace,
  cardPropStatus,
} from '../Card';
import mdx from './Card.docs.mdx';

const defaultKnobs = () => ({
  verticalSpace: select('verticalSpace', cardPropSpace, cardPropSpace[0]),
  horizontalSpace: select('horizontalSpace', cardPropSpace, cardPropSpace[0]),
  shadow: boolean('shadow', true),
  border: boolean('border', false),
  status: select('status', ['', ...cardPropStatus], ''),
  form: select('form', cardPropForm, cardPropFormDefault),
});

const cnCardStories = cn('cnCardStories');

export const Playground = () => {
  const { verticalSpace, horizontalSpace, shadow, status, form, border } =
    defaultKnobs();

  return (
    <div className={cnCardStories()}>
      <Card
        horizontalSpace={horizontalSpace}
        verticalSpace={verticalSpace}
        shadow={shadow}
        border={border}
        status={status}
        form={form}
      />
    </div>
  );
};

export default createMetadata({
  title: 'Компоненты|/Отображение данных/Card',
  id: 'components/Card',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=24670%3A0',
    },
  },
});
