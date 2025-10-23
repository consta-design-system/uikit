import './Sidebar.css';

import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { useModal } from '##/components/Modal/useModal';
import {
  PortalWithTheme,
  PortalWithThemeConsumer,
} from '##/components/PortalWithTheme';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';

import {
  SidebarActionsProps,
  SidebarComponent,
  SidebarContentProps,
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

export const Sidebar: SidebarComponent = (props) => {
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
    refsForExcludeClickOutside,
    ...otherProps
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const {
    shadowHeader,
    shadowFooter,
    scrollable,
    theme,
    portalRef,
    windowRef,
    contentRef,
    scrollRef,
    ignoreClicksInsideRefs,
    windowElAtom,
  } = useModal({
    ref,
    isOpen,
    onEsc,
    onOpen,
    onClose,
    refsForExcludeClickOutside,
  });

  const animateTimeout = useAnimateTimeout(windowElAtom, position);

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
            ...(style?.zIndex === 'number' && {
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
              { size, position, animate, scrollable },
              [className],
            )}
            ref={windowRef}
          >
            <div
              className={cnSidebar('Scroll', cnMixScrollBar({ size: 's' }))}
              ref={scrollRef}
            >
              <div className={cnSidebar('Content')} ref={contentRef}>
                <PortalWithThemeConsumer
                  onClickOutside={onClickOutside}
                  ignoreClicksInsideRefs={ignoreClicksInsideRefs}
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
};
/**
 * @deprecated use actions
 */
Sidebar.Content = SidebarContent;
/**
 * @deprecated use actions
 */
Sidebar.Actions = SidebarActions;
