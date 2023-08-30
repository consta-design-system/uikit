import './BookmarkTabs.css';

import { IconAdd } from '@consta/icons/IconAdd';
import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { forwardRef } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';
import { cn } from '##/utils/bem';

import { Button } from '../Button';
import { BookmarkTabsTab } from './BookmarkTabsTab';
import { withDefaultGetters } from './helper';
import {
  BookmarkTabsComponent,
  bookmarkTabsPropFormDefault,
  BookmarkTabsProps,
  bookmarkTabsPropSizeDefault,
  bookmarkTabsPropViewDefault,
  BookmarkTabsRenderItemProps,
} from './types';
import { useBookmarkTabs } from './useBookmarkTabs';

export const cnBookmarkTabs = cn('BookmarkTabs');

const renderItemDefault = <ITEM,>(
  props: BookmarkTabsRenderItemProps<ITEM>,
): React.ReactElement => {
  const { item: _item, attributes = {}, ...otherProps } = props;
  return <BookmarkTabsTab {...attributes} {...otherProps} />;
};

const BookmarkTabsRender = (
  props: BookmarkTabsProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items = [],
    value,
    onCreate,
    getItemKey,
    getItemLabel,
    getItemLeftIcon,
    getItemRightIcon,
    getItemAs,
    getItemRef,
    getItemAttributes,
    getItemFixed,
    onChange,
    onRemove,
    renderItem: renderItemProp = renderItemDefault,
    size = bookmarkTabsPropSizeDefault,
    form = bookmarkTabsPropFormDefault,
    view = bookmarkTabsPropViewDefault,
    withNavigationButtons,
    className,
    id,
    ...otherProps
  } = withDefaultGetters(props);

  type Item = typeof items[number];

  const getItemActive = (item: Item) => {
    return value ? getItemKey(item) === getItemKey(value) : false;
  };

  const {
    refs,
    fixedTabs,
    fixedTabsRef,
    otherTabs,
    otherTabsRef,
    showControls,
    wrapperRef,
    containerRef,
    controlsRef,
    addButtonRef,
    navigate,
    sizes,
  } = useBookmarkTabs({
    items,
    getItemFixed,
    size,
    withNavigationButtons,
    withAddButton: !!onCreate,
  });

  const { width: fixedWidth } = useComponentSize(fixedTabsRef);

  const renderItem = (
    item: Item,
    fixed: boolean,
    controlRef: React.RefObject<HTMLElement>,
    tabWidth?: string,
  ) =>
    renderItemProp({
      item,
      onClick: (e) => onChange?.(item, { e }),
      active: getItemActive(item),
      label: getItemLabel(item),
      leftIcon: getItemLeftIcon(item),
      rightIcon: getItemRightIcon(item),
      as: getItemAs(item) ?? 'button',
      attributes: getItemAttributes(item),
      tabRef: getItemRef(item),
      controlRef,
      fixed,
      onClose: onRemove ? (e) => onRemove(item, { e }) : undefined,
      size,
      view,
      form,
      tabWidth,
    });

  return (
    <div
      className={cnBookmarkTabs({ size, view, form }, [className])}
      ref={useForkRef([ref, containerRef])}
      id={id}
      {...otherProps}
    >
      {showControls && (
        <div ref={controlsRef} className={cnBookmarkTabs('ScrollControls')}>
          <div className={cnBookmarkTabs('Button')}>
            <Button
              view="clear"
              size="xs"
              type="button"
              onClick={() => navigate('prev')}
              iconLeft={IconArrowLeft}
              onlyIcon
            />
          </div>
          <div className={cnBookmarkTabs('Button')}>
            <Button
              view="clear"
              size="xs"
              onClick={() => navigate('next')}
              iconLeft={IconArrowRight}
              onlyIcon
            />
          </div>
        </div>
      )}
      <div ref={wrapperRef} className={cnBookmarkTabs('Wrapper')}>
        <div
          style={{
            ['--bookmarks-list-width' as string]: `max-content`,
          }}
          ref={fixedTabsRef}
          className={cnBookmarkTabs('List')}
        >
          {fixedTabs.map((item, index) => (
            <React.Fragment key={getItemKey(item)}>
              {renderItem(item, true, refs[index])}
            </React.Fragment>
          ))}
        </div>
        <div
          style={{
            ['--bookmarks-list-width' as string]: `calc(100% - ${fixedWidth}px)`,
          }}
          className={cnBookmarkTabs('List')}
          ref={otherTabsRef}
        >
          {otherTabs.map((item, index) => (
            <React.Fragment key={getItemKey(item)}>
              {renderItem(
                item,
                false,
                refs[fixedTabs.length + index],
                sizes[index],
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {onCreate && (
        <div
          ref={addButtonRef}
          className={cnBookmarkTabs('Button', { type: 'add' })}
        >
          <Button
            view="clear"
            size="xs"
            onClick={onCreate}
            iconLeft={IconAdd}
            onlyIcon
          />
        </div>
      )}
      <div className={cnBookmarkTabs('Empty')} />
    </div>
  );
};

export const BookmarkTabs = forwardRef(
  BookmarkTabsRender,
) as BookmarkTabsComponent;
