import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { Item, items } from '../__mocks__/mock.data';
import { IconAdd } from '../../../icons/IconAdd/IconAdd';
import { IconRemove } from '../../../icons/IconRemove/IconRemove';
import { createMetadata } from '../../../utils/storybook';
import { Badge } from '../../Badge/Badge';
import {
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIcon,
  collapsePropDirectionIconDefault,
  collapsePropHorizontalSpace,
  collapsePropIconPosition,
  collapsePropIconPositionDefault,
  collapsePropSize,
  collapsePropSizeDefault,
  collapsePropView,
  collapsePropViewDefault,
} from '../../Collapse/Collapse';
import { CollapseGroup } from '../CollapseGroup';

import mdx from './CollapseGroup.docs.mdx';

const defaultKnobs = () => ({
  size: select('size', collapsePropSize, collapsePropSizeDefault),
  hoverEffect: boolean('hoverEffect', false),
  isAccordion: boolean('isAccordion', false),
  view: select('view', collapsePropView, collapsePropViewDefault),
  divider: boolean('divider', false),
  horizontalSpace: select(
    'horizontalSpace',
    collapsePropHorizontalSpace,
    collapsePropHorizontalSpace[0],
  ),
  directionIcon: select(
    'directionIcon',
    collapsePropDirectionIcon,
    collapsePropDirectionIconDefault,
  ),
  closeDirectionIcon: select(
    'closeDirectionIcon',
    collapsePropDirectionIcon,
    collapsePropCloseDirectionIconDefault,
  ),
  iconPosition: select('iconPosition', collapsePropIconPosition, collapsePropIconPositionDefault),
  rightSide: boolean('rightSide', false),
  withCustomIcon: boolean('withCustomIcon', false),
});

export function Playground() {
  const {
    size,
    hoverEffect,
    view,
    divider,
    horizontalSpace,
    directionIcon,
    closeDirectionIcon,
    isAccordion,
    rightSide,
    iconPosition,
    withCustomIcon,
  } = defaultKnobs();

  const getItemRightSide = (item: Item) => {
    if (rightSide) {
      return <Badge size="s" status={item.status} label={item.status} />;
    }

    return undefined;
  };

  return (
    <CollapseGroup
      style={{ maxWidth: 300 }}
      items={items}
      isAccordion={isAccordion}
      size={size}
      hoverEffect={hoverEffect}
      view={view}
      divider={divider}
      horizontalSpace={horizontalSpace}
      {...(iconPosition === 'left'
        ? {
            iconPosition,
            getItemRightSide,
          }
        : { iconPosition })}
      {...(withCustomIcon
        ? {
            icon: IconAdd,
            closeIcon: IconRemove,
          }
        : {
            directionIcon,
            closeDirectionIcon,
          })}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Отображение данных/CollapseGroup',
  id: 'components/CollapseGroup',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
