import React, { forwardRef } from 'react';

import { IconArrowDown } from '../../icons/IconArrowDown/IconArrowDown';
import {
  Collapse,
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIconDefault,
  collapsePropIconPositionDefault,
  collapsePropSizeDefault,
  collapsePropViewDefault,
} from '../Collapse/Collapse';

import { CollapseGroupComponent, CollapseGroupRenderFunction, withDefaultGetters } from './helpers';
import { useChoice } from './useChoice';

const CollapseGroupRender: CollapseGroupRenderFunction = (props, ref) => {
  const {
    items,
    getItemLabel,
    getItemContent,
    size = collapsePropSizeDefault,
    view = collapsePropViewDefault,
    hoverEffect,
    divider,
    icon = IconArrowDown,
    closeIcon,
    getItemRightSide,
    horizontalSpace,
    iconPosition = collapsePropIconPositionDefault,
    directionIcon = collapsePropDirectionIconDefault,
    closeDirectionIcon = collapsePropCloseDirectionIconDefault,
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
            horizontalSpace={horizontalSpace}
            icon={icon}
            hoverEffect={hoverEffect}
            divider={divider}
            isOpen={getChecked(index)}
            onClick={getOnChange(index)}
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

export const CollapseGroup = forwardRef(CollapseGroupRender) as CollapseGroupComponent;

export * from './helpers';
