import './TabsTab.css';

import React, { forwardRef } from 'react';

import { ListItem, mapItemVerticalPadding } from '##/components/ListCanary';
import { useForkRef } from '##/hooks/useForkRef';
import { cnMixFocus } from '##/mixs/MixFocus';
import { cn } from '##/utils/bem';

import { TabsTabComponent, TabsTabProps } from '../types';

export const cnTabsTab = cn('TabsTab');

const TabsTabRender = (
  props: TabsTabProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const {
    label,
    onChange,
    checked,
    size,
    onlyIcon,
    icon,
    iconSize,
    leftIcon,
    leftSide,
    tabRef,
    className,
    as: Tag = 'button',
    rightIcon,
    rightSide,
    disabled,
    renderInDropdown,
    ...otherProps
  } = props;

  const currentRef = useForkRef([ref, tabRef]);

  return (
    <ListItem
      as={Tag}
      className={cnTabsTab({ checked, onlyIcon, renderInDropdown, disabled }, [
        !disabled ? cnMixFocus({ before: true }) : undefined,
        className,
      ])}
      role="tab"
      type="button"
      tabIndex={disabled ? -1 : undefined}
      ref={currentRef}
      title={onlyIcon ? label.toString() : undefined}
      label={onlyIcon ? undefined : label.toString()}
      onClick={checked ? undefined : onChange}
      leftIcon={onlyIcon ? leftIcon || icon || rightIcon : leftIcon || icon}
      leftSide={onlyIcon ? undefined : leftSide}
      rightIcon={onlyIcon ? undefined : rightIcon}
      rightSide={onlyIcon ? undefined : rightSide}
      iconSize={iconSize}
      disabled={disabled}
      size={size}
      space={{
        pV: mapItemVerticalPadding ? mapItemVerticalPadding[size] : 'xs',
      }}
      {...otherProps}
    />
  );
};

export const TabsTab = forwardRef(TabsTabRender) as TabsTabComponent;
