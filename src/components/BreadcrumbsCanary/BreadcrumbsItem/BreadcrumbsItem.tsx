import './BreadcrumbsItem.css';

import React, { forwardRef, useRef } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { IconArrowRight } from '../../../icons/IconArrowRight/IconArrowRight';
import { IconSelect } from '../../../icons/IconSelect/IconSelect';
import { cnMixSpace } from '../../../mixs/MixSpace/MixSpace';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { Button } from '../../Button/Button';
import { ContextMenu } from '../../ContextMenuCanary/ContextMenuCanary';
import { Text } from '../../Text/Text';
import {
  contextMenuSizeMap,
  getItemAs,
  getItemAttributes,
} from '../BreadcrumbsMore/BreadcrumbsMore';
import { iconSizeMap } from '../helpers';
import {
  BreadcrumbsItemComponent,
  BreadcrumbsItemProps,
  BreadcrumbsPropOnItemClick,
} from '../types';

export const cnBreadcrumbsItem = cn('BreadcrumbsItem');

function BreadcrumbsItemRender<ITEM>(
  props: BreadcrumbsItemProps<ITEM>,
  ref: React.Ref<HTMLLIElement>,
) {
  const {
    className,
    onItemClick: onItemClickProp,
    item,
    size,
    onlyIcon: onlyIconProp,
    delimiter,
    active,
    getItemHref,
    getItemIcon,
    getItemLabel,
    getItemSubMenu,
    children,
    ...otherProps
  } = props;

  const [open, setOpen] = useFlag();
  const [hovered, setHovered] = useFlag();

  const breadcrumbsItemRef = useRef<HTMLLinkElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const Icon = item && getItemIcon?.(item);
  const onlyIcon = Icon && onlyIconProp;
  const href = item && getItemHref?.(item);
  const label = item && getItemLabel?.(item);
  const subMenu = item && getItemSubMenu?.(item);

  const iconSize = getByMap(iconSizeMap, size);
  const linkProps = href
    ? ({
        as: 'a',
        href,
      } as const)
    : ({
        as: 'span',
      } as const);

  const handleClick: React.MouseEventHandler = (e) => {
    item && onItemClickProp?.({ e, item });
  };

  const onItemClick: BreadcrumbsPropOnItemClick<ITEM> = ({ e, item }) => {
    setOpen.off();
    item && onItemClickProp?.({ e, item });
  };

  const hoveredProps = {
    onMouseEnter: setHovered.on,
    onMouseLeave: setHovered.off,
  };

  useClickOutside({
    isActive: true,
    ignoreClicksInsideRefs: [breadcrumbsItemRef, buttonRef, contextMenuRef],
    handler: setOpen.off,
  });

  return (
    <li className={cnBreadcrumbsItem(null, [className])} ref={ref} {...otherProps}>
      {delimiter && (
        <IconArrowRight
          className={cnBreadcrumbsItem('Delimiter', [cnMixSpace({ mH: size })])}
          view="ghost"
          size={iconSize}
        />
      )}
      {children || (
        <>
          <Text
            className={cnBreadcrumbsItem('Link', { active, hovered })}
            view={active ? 'primary' : 'secondary'}
            onClick={handleClick}
            size={size}
            truncate={!onlyIcon}
            ref={breadcrumbsItemRef}
            {...hoveredProps}
            {...linkProps}
          >
            {Icon &&
              (onlyIcon ? (
                <Button view="clear" onlyIcon iconLeft={Icon} size={iconSize} />
              ) : (
                <Icon
                  className={cnBreadcrumbsItem('Icon', [cnMixSpace({ mR: 'xs' })])}
                  size={iconSize}
                />
              ))}
            {!onlyIcon && label}
          </Text>
          {subMenu && (
            <button
              ref={buttonRef}
              onClick={setOpen.toogle}
              {...hoveredProps}
              type="button"
              className={cnBreadcrumbsItem('SelectButton', { hovered })}
            >
              <IconSelect size="xs" view={active ? 'primary' : 'secondary'} />
            </button>
          )}
        </>
      )}

      {subMenu && (
        <ContextMenu
          isOpen={open}
          items={subMenu}
          ref={contextMenuRef}
          getItemLabel={getItemLabel}
          getItemSubMenu={getItemSubMenu}
          getItemLeftIcon={getItemIcon}
          onItemClick={onItemClick}
          getItemAs={getItemAs(getItemHref)}
          getItemAttributes={getItemAttributes(getItemHref)}
          direction="downCenter"
          possibleDirections={[
            'downCenter',
            'upCenter',
            'downStartLeft',
            'upStartLeft',
            'downStartRight',
            'upStartRight',
          ]}
          anchorRef={breadcrumbsItemRef}
          offset={8}
          size={contextMenuSizeMap[size]}
        />
      )}
    </li>
  );
}

export const BreadcrumbsItem = forwardRef(BreadcrumbsItemRender) as BreadcrumbsItemComponent;
