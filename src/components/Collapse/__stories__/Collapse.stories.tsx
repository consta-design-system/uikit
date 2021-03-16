import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconArrowLeft } from '../../../icons/IconArrowLeft/IconArrowLeft';
import { IconArrowRight } from '../../../icons/IconArrowRight/IconArrowRight';
import { createMetadata } from '../../../utils/storybook';
import { Badge } from '../../Badge/Badge';
import {
  Collapse,
  collapsePropPadding,
  collapsePropPaddingDefault,
  collapsePropSize,
  collapsePropSizeDefault,
  collapsePropView,
  collapsePropViewDefault,
} from '../Collapse';

import mdx from './Collapse.mdx';

const defaultKnobs = () => ({
  size: select('size', collapsePropSize, collapsePropSizeDefault),
  label: text('label', 'Заголовок'),
  iconPosition: select('iconPosition', ['left', 'right'], 'left'),
  withHoverEffect: boolean('withHoverEffect', false),
  withCustomIcon: boolean('withCustomIcon', false),
  view: select('view', collapsePropView, collapsePropViewDefault),
  withDivider: boolean('withDivider', false),
  horizontalPadding: select('horizontalPadding', collapsePropPadding, collapsePropPaddingDefault),
  rightSide: boolean('rightSide', false),
});

export function Playground() {
  const {
    size,
    label,
    withHoverEffect,
    iconPosition,
    withCustomIcon,
    view,
    withDivider,
    horizontalPadding,
    rightSide,
  } = defaultKnobs();
  const [isOpen, setOpen] = useState<boolean>(false);
  const defaultChildren =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  const defaultRightSide = <Badge label="Статус" />;

  return iconPosition === 'left' ? (
    <Collapse
      size={size}
      label={label}
      isOpen={isOpen}
      onClick={() => setOpen(!isOpen)}
      withHoverEffect={withHoverEffect}
      iconPosition={iconPosition}
      icon={withCustomIcon ? IconArrowRight : undefined}
      closeIcon={withCustomIcon ? IconArrowLeft : undefined}
      view={view}
      withDivider={withDivider}
      horizontalPadding={horizontalPadding}
      rightSide={rightSide ? defaultRightSide : undefined}
    >
      {defaultChildren}
    </Collapse>
  ) : (
    <Collapse
      size={size}
      label={label}
      isOpen={isOpen}
      onClick={() => setOpen(!isOpen)}
      withHoverEffect={withHoverEffect}
      iconPosition={iconPosition}
      icon={withCustomIcon ? IconArrowRight : undefined}
      closeIcon={withCustomIcon ? IconArrowLeft : undefined}
      view={view}
      withDivider={withDivider}
      horizontalPadding={horizontalPadding}
    >
      {defaultChildren}
    </Collapse>
  );
}

export default createMetadata({
  title: 'Компоненты|/Collapse',
  id: 'components/Collapse',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
