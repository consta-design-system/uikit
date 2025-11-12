import './Sidebar.css';

import React, { forwardRef } from 'react';
import { Transition } from 'react-transition-group';

import { useModal } from '##/components/Modal/useModal';
import {
  PortalWithTheme,
  PortalWithThemeConsumer,
} from '##/components/PortalWithTheme';
import { useForkRef } from '##/hooks/useForkRef';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';
import { withCtx } from '##/utils/state';

import {
  SidebarActionsProps,
  SidebarComponent,
  SidebarContentProps,
  SidebarProps,
} from './types';
import { useAnimateTimeout } from './useAnimateTimeout';

export const cnSidebar = cn('Sidebar');

const SidebarContent: React.FC<SidebarContentProps> = ({
  className,
  children,
  ...rest
}) => (
  <div
    className={cnSidebar('Content', [className, cnMixScrollBar()])}
    {...rest}
  >
    {children}
  </div>
);

const SidebarActions: React.FC<SidebarActionsProps> = ({
  className,
  children,
  ...rest
}) => (
  <div className={cnSidebar('Actions', [className])} {...rest}>
    {children}
  </div>
);

export const Sidebar = withCtx(
  forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
    const {
      isOpen,
      onClose,
      onOpen,
      hasOverlay = true,
      onClickOutside,
      onEsc,
      position = 'right',
      size = 'm',
      className,
      children,
      container = window.document.body,
      style,
      rootClassName,
      afterClose,
      ignoreOutsideClicksRefs: ignoreOutsideClicksRefsProp,
      border,
      scrollContainerRef: scrollContainerRefProp,
      ...otherProps
    } = props;

    const {
      shadowHeader,
      shadowFooter,
      scrollable,
      theme,
      portalRef,
      windowRef,
      contentRef,
      scrollRef,
      ignoreOutsideClicksRefs,
      windowElAtom,
    } = useModal({
      ref,
      isOpen,
      onEsc,
      onOpen,
      onClose,
      ignoreOutsideClicksRefs: ignoreOutsideClicksRefsProp,
    });

    const animateTimeout = useAnimateTimeout(windowElAtom, position);
    const scrollContainerRef = useForkRef([scrollContainerRefProp, scrollRef]);

    return (
      <Transition
        in={isOpen}
        unmountOnExit
        timeout={animateTimeout}
        nodeRef={portalRef}
        onExiting={afterClose}
      >
        {(animate) => (
          <PortalWithTheme
            preset={theme}
            ref={portalRef}
            container={container}
            className={cnSidebar({ position, hasOverlay }, [rootClassName])}
            style={{
              ...(style?.zIndex && {
                zIndex: style.zIndex,
              }),
              ['--sidebar-animate-timeout' as string]: `${animateTimeout}ms`,
              ...(shadowHeader && {
                ['--modal-layout-header-color-shadow' as string]:
                  'var(--color-shadow-group-2)',
              }),
              ...(shadowFooter && {
                ['--modal-layout-footer-color-shadow' as string]:
                  'var(--color-shadow-group-2)',
              }),
              ...(style?.zIndex && {
                ['--modal-layout-z-index-for-fixed-slot' as string]:
                  style.zIndex,
              }),
            }}
          >
            {hasOverlay && (
              <div
                className={cnSidebar('Overlay', { animate })}
                aria-label="Overlay"
              />
            )}
            <div
              {...otherProps}
              style={{
                ...style,
                zIndex: undefined,
              }}
              className={cnSidebar(
                'Window',
                {
                  size,
                  position,
                  animate,
                  scrollable,
                  border,
                },
                [className],
              )}
              ref={windowRef}
            >
              <div
                className={cnSidebar('Scroll', cnMixScrollBar({ size: 's' }))}
                ref={scrollContainerRef}
              >
                <div className={cnSidebar('Content')} ref={contentRef}>
                  <PortalWithThemeConsumer
                    onClickOutside={onClickOutside}
                    ignoreClicksInsideRefs={ignoreOutsideClicksRefs}
                  >
                    {children}
                  </PortalWithThemeConsumer>
                </div>
              </div>
            </div>
          </PortalWithTheme>
        )}
      </Transition>
    );
  }),
) as SidebarComponent;
/**
 * @deprecated use actions
 */
Sidebar.Actions = SidebarActions;

/**
 * @deprecated use actions
 */
Sidebar.Content = SidebarContent;
