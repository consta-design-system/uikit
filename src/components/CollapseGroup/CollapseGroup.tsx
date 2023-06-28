import { IconArrowDown } from '@consta/icons/IconArrowDown';
import React, { forwardRef } from 'react';

import {
  Collapse,
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIconDefault,
  collapsePropFormDefault,
  collapsePropIconPositionDefault,
  collapsePropSizeDefault,
  collapsePropViewDefault,
} from '../Collapse/Collapse';
import {
  CollapseGroupComponent,
  CollapseGroupRenderFunction,
  withDefaultGetters,
} from './helpers';
import { useChoice } from './useChoice';

const CollapseGroupRender: CollapseGroupRenderFunction = (props, ref) => {
  const {
    items,
    getItemLabel,
    getItemContent,
    size = collapsePropSizeDefault,
    view = collapsePropViewDefault,
    form = collapsePropFormDefault,
    hoverEffect,
    divider,
    icon = IconArrowDown,
    closeIcon,
    getItemRightSide,
    horizontalSpace,
    iconPosition = collapsePropIconPositionDefault,
    directionIcon = collapsePropDirectionIconDefault,
    closeDirectionIcon = collapsePropCloseDirectionIconDefault,
    iconView,
    isAccordion,
    ...otherProps
  } = withDefaultGetters(props);

  const { getChecked, getOnChange } = useChoice(props);

  return (
    <div ref={ref} {...otherProps}>
      {items.map((item, index) => {
        return (
          <Collapse
            label={getItemLabel(item)}
            key={index}
            size={size}
            view={view}
            form={form}
            horizontalSpace={horizontalSpace}
            icon={icon}
            hoverEffect={hoverEffect}
            divider={divider}
            isOpen={getChecked(index)}
            onClick={getOnChange(index)}
            iconView={iconView}
            {...(iconPosition === 'left'
              ? {
                  iconPosition,
                  rightSide: getItemRightSide(item),
                }
              : { iconPosition })}
            {...(closeIcon
              ? { closeIcon }
              : {
                  directionIcon,
                  closeDirectionIcon,
                })}
          >
            {getItemContent(item)}
          </Collapse>
        );
      })}
    </div>
  );
};

export const CollapseGroup = forwardRef(
  CollapseGroupRender,
) as CollapseGroupComponent;

export * from './helpers';
