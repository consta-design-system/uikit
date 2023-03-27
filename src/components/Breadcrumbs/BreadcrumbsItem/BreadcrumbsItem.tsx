import './BreadcrumbsItem.css';

import { IconArrowRight } from '@consta/icons/IconArrowRight';
import { IconSelect } from '@consta/icons/IconSelect';
import React, { forwardRef, useRef } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { cnMixSpace } from '../../../mixs/MixSpace/MixSpace';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { Button } from '../../Button/Button';
import { ContextMenu } from '../../ContextMenu/ContextMenu';
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

  const buttonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <li
      className={cnBreadcrumbsItem(null, [className])}
      ref={ref}
      {...otherProps}
    >
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
            className={cnBreadcrumbsItem('Link', { active })}
            view={active ? 'primary' : 'secondary'}
            onClick={handleClick}
            size={size}
            truncate={!onlyIcon}
            {...linkProps}
          >
            {Icon &&
              (onlyIcon ? (
                <Button
                  type="button"
                  view="clear"
                  onlyIcon
                  iconLeft={Icon}
                  size={iconSize}
                />
              ) : (
                <Icon
                  className={cnBreadcrumbsItem('Icon', [
                    cnMixSpace({ mR: 'xs' }),
                  ])}
                  size={iconSize}
                />
              ))}
            {!onlyIcon && label}
          </Text>
          {subMenu && (
            <button
              ref={buttonRef}
              onClick={setOpen.toggle}
              type="button"
              className={cnBreadcrumbsItem('SelectButton')}
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
          getItemLabel={getItemLabel}
          getItemSubMenu={getItemSubMenu}
          getItemLeftIcon={getItemIcon}
          onItemClick={onItemClick}
          getItemAs={getItemAs(getItemHref)}
          getItemAttributes={getItemAttributes(getItemHref)}
          direction="downStartRight"
          possibleDirections={[
            'downStartLeft',
            'upStartLeft',
            'downStartRight',
            'upStartRight',
          ]}
          anchorRef={buttonRef}
          offset="xs"
          onClickOutside={setOpen.off}
          size={contextMenuSizeMap[size]}
        />
      )}
    </li>
  );
}

export const BreadcrumbsItem = forwardRef(
  BreadcrumbsItemRender,
) as BreadcrumbsItemComponent;
