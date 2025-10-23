import './Modal.css';

import React, { forwardRef } from 'react';
import { Transition } from 'react-transition-group';

import {
  PortalWithTheme,
  PortalWithThemeConsumer,
} from '##/components/PortalWithTheme';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';
import { withCtx } from '##/utils/state';

import { ModalProps } from './types';
import { useModal } from './useModal';

const cnModal = cn('Modal');

export const Modal = withCtx(
  forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
    const {
      isOpen,
      onClose,
      onOpen,
      hasOverlay = true,
      onOverlayClick,
      onClickOutside,
      onEsc,
      className,
      width,
      form = 'default',
      border,
      position = 'center',
      children,
      container = window.document.body,
      refsForExcludeClickOutside,
      rootClassName,
      afterClose,
      style,
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
      ignoreClicksInsideRefs,
    } = useModal({
      ref,
      isOpen,
      onEsc,
      onOpen,
      onClose,
      refsForExcludeClickOutside,
    });

    return (
      <Transition
        in={isOpen}
        unmountOnExit
        nodeRef={portalRef}
        timeout={animateTimeout}
        onExited={afterClose}
      >
        {(animate) => (
          <PortalWithTheme
            preset={theme}
            container={container}
            className={cnModal({ hasOverlay }, [rootClassName])}
            ref={portalRef}
            style={{
              ...(style?.zIndex === 'number' && {
                zIndex: style.zIndex,
              }),
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
                className={cnModal('Overlay', { animate })}
                aria-label="Overlay"
              />
            )}
            <div
              {...otherProps}
              style={{
                ...style,
                zIndex: undefined,
              }}
              className={cnModal(
                'Window',
                { position, form, border, scrollable },
                [cnMixPopoverAnimate({ animate }), className],
              )}
              ref={windowRef}
            >
              <div
                className={cnModal('Scroll', cnMixScrollBar({ size: 's' }))}
                ref={scrollRef}
              >
                <div className={cnModal('Content')} ref={contentRef}>
                  <PortalWithThemeConsumer
                    onClickOutside={onClickOutside || onOverlayClick}
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
  }),
);
