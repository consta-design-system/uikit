import './BookmarkTabsTab.css';

import { IconClose } from '@consta/icons/IconClose';
import React, { forwardRef, useRef } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { useForkRef } from '##/hooks/useForkRef';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cnCanary as cn } from '##/utils/bem';

import { BookmarkTabsTabComponent, BookmarkTabsTabProps } from '../types';

export const cnBookmarkTabsTab = cn('BookmarkTabsTab');

const BookmarkTabsTabRender = (
  props: BookmarkTabsTabProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    label,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    as: Tag = 'div',
    onClick,
    size,
    form,
    active,
    fixed,
    tabRef,
    hovered,
    onClose,
    onKeyDown: onKeyDownProp,
    view,
    className,
    bordered,
    tabWidth = '100%',
    style,
    ...otherProps
  } = props;

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  const onCloseKeydown: React.KeyboardEventHandler = (e) => {
    const { code } = e;
    e.stopPropagation();
    e.preventDefault();
    if (code === 'Tab' || code === 'Escape') {
      tagRef?.current?.focus();
    }
    if (code === 'Enter' || code === 'Space') {
      onClose?.(e);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { code } = e;
    onKeyDownProp?.(e);
    if (onClose && code === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      closeButtonRef.current?.focus();
    }
  };

  return (
    <Tag
      className={cnBookmarkTabsTab(
        {
          size,
          form,
          view,
          active,
          hovered,
          fixed,
          bordered,
          withCloseButton: !!onClose,
          withLeftIcon: !!LeftIcon,
          withRightIcon: !!RightIcon,
        },
        [className],
      )}
      role="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={useForkRef([ref, tabRef, tagRef])}
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
          <Text
            align="left"
            className={cnBookmarkTabsTab('Label')}
            size={size}
            view="primary"
            lineHeight="m"
          >
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
              ref={closeButtonRef}
              type="button"
              view="clear"
              onKeyDown={onCloseKeydown}
              tabIndex={-1}
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
