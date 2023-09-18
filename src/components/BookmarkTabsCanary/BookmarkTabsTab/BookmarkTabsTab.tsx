import './BookmarkTabsTab.css';

import { IconClose } from '@consta/icons/IconClose';
import React, { forwardRef } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { useForkRef } from '##/hooks/useForkRef';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cnCanary as cn } from '##/utils/bem';

import { BookmarkTabsTabComponent, BookmarkTabsTabProps } from '../types';

export const cnBookmarkTabsTab = cn('BookmarkTabsTab');

const BookmarkTabsTabRender = (
  props: BookmarkTabsTabProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const {
    label,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    as: Tag = 'button',
    onClick,
    size,
    form,
    active,
    fixed,
    tabRef,
    controlRef,
    onClose,
    view,
    className,
    bordered,
    tabWidth = '100%',
    style,
    ...otherProps
  } = props;

  return (
    <Tag
      className={cnBookmarkTabsTab(
        {
          size,
          form,
          view,
          active,
          fixed,
          bordered,
          withCloseButton: !!onClose,
          withLeftIcon: !!LeftIcon,
          withRightIcon: !!RightIcon,
        },
        [className],
      )}
      role="tab"
      type="button"
      onClick={onClick}
      ref={useForkRef([ref, tabRef, controlRef])}
      style={{
        ['--bookmarks-tab-width' as string]: tabWidth,
        ...style,
      }}
      {...otherProps}
    >
      {LeftIcon && (
        <LeftIcon
          className={cnBookmarkTabsTab('Icon', { side: 'left' }, [
            fixed ? undefined : cnMixSpace({ mR: size === 's' ? '2xs' : 'xs' }),
          ])}
          size={size}
        />
      )}
      {!fixed && (
        <>
          <Text align="left" className={cnBookmarkTabsTab('Label')} size={size}>
            {label}
          </Text>
          {RightIcon && (
            <RightIcon
              className={cnBookmarkTabsTab('Icon', { side: 'right' }, [
                cnMixSpace({ mL: 'xs' }),
              ])}
              size="xs"
              view="secondary"
            />
          )}
          {onClose && (
            <Button
              size="xs"
              onlyIcon
              as="div"
              view="clear"
              className={cnBookmarkTabsTab('Button', [
                cnMixSpace({ mL: 'xs' }),
              ])}
              onClick={onClose}
              iconLeft={IconClose}
            />
          )}
        </>
      )}
    </Tag>
  );
};

export const BookmarkTabsTab = forwardRef(
  BookmarkTabsTabRender,
) as BookmarkTabsTabComponent;
