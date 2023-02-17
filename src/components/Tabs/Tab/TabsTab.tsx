import './TabsTab.css';

import React, { forwardRef } from 'react';

import {
  ListItem,
  mapIconSize,
  mapItemVerticalPadding,
} from '##/components/ListCanary';
import { cnMixFocus } from '##/mixs/MixFocus';
import { cn } from '##/utils/bem';
import { getByMap } from '##/utils/getByMap';

import { TabsTabProps } from '../types';

export const cnTabsTab = cn('TabsTab');

export const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(
  (props, ref) => {
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
      className,
      rightIcon,
      rightSide,
      disabled,
      renderInDropdown,
    } = props;

    if (onlyIcon) {
      const Icon = leftIcon || rightIcon || icon;

      return (
        <button
          className={cnTabsTab({ size, checked, onlyIcon, renderInDropdown }, [
            cnMixFocus({ before: true }),
            className,
          ])}
          role="tab"
          type="button"
          onClick={checked ? undefined : onChange}
          title={label}
        >
          {Icon && <Icon size={getByMap(mapIconSize, size, iconSize)} />}
        </button>
      );
    }

    return (
      <ListItem
        as="button"
        className={cnTabsTab(
          { checked, onlyIcon, renderInDropdown, disabled },
          [!disabled ? cnMixFocus({ before: true }) : undefined, className],
        )}
        role="tab"
        type="button"
        tabIndex={disabled ? -1 : undefined}
        onClick={checked ? undefined : onChange}
        ref={ref}
        title={onlyIcon ? label.toString() : undefined}
        label={label}
        leftIcon={leftIcon || icon}
        leftSide={leftSide}
        rightIcon={rightIcon}
        rightSide={rightSide}
        iconSize={iconSize}
        disabled={disabled}
        size={size}
        space={{
          pV: mapItemVerticalPadding ? mapItemVerticalPadding[size] : 'xs',
        }}
      />
    );
  },
);
