import './Modal.css';

import { useAction, useAtom, useUpdate } from '@reatom/npm-react';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

import {
  PortalWithTheme,
  PortalWithThemeConsumer,
} from '##/components/PortalWithTheme';
import { useTheme } from '##/components/Theme/Theme';
import { useForkRef } from '##/hooks/useForkRef';
import { useGlobalKeys } from '##/hooks/useGlobalKeys';
import { getElementHeight } from '##/hooks/useResizeObserved';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';
import { withCtx } from '##/utils/state';
import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { useElementAtomEventListener } from '##/utils/state/useElementAtomEventListener';
import { useRefAtom } from '##/utils/state/useRefAtom';
import { useResizeObservedAtom } from '##/utils/state/useResizeObservedAtom';

import { ModalProps } from './types';

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

    const { theme } = useTheme();

    const modalRef = useRef<HTMLDivElement | null>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const [modalElAtom, modalRefCallback] = useRefAtom<HTMLDivElement>();
    const [contentElAtom, contentRefCallback] = useRefAtom<HTMLDivElement>();
    const [scrollElAtom, scrollRefCallback] = useRefAtom<HTMLDivElement>();
    const modalRefForked = useForkRef([modalRef, modalRefCallback, ref]);
    const heightAtom = useResizeObservedAtom(
      useCreateAtom((ctx) => [ctx.spy(modalElAtom), ctx.spy(contentElAtom)]),
      getElementHeight,
    );
    const elScrollDimensionsAtom = useResizeObservedAtom(
      useCreateAtom((ctx) => [ctx.spy(scrollElAtom)]),
      (el) => [el?.scrollHeight || 0, el?.clientHeight || 0] as const,
    );

    const scrollTopAtom = useCreateAtom<number>(0);
    const updateScrollTop = useAction((ctx) =>
      scrollTopAtom(ctx, ctx.get(scrollElAtom)?.scrollTop || 0),
    );

    const [shadowHeader] = useAtom<boolean>(
      (ctx) => ctx.spy(scrollTopAtom) > 0,
    );

    const [shadowFooter] = useAtom<boolean>((ctx) => {
      const scrollTop = ctx.spy(scrollTopAtom);
      const [[scrollHeight, clientHeight] = [0, 0]] = ctx.spy(
        elScrollDimensionsAtom,
      );

      return scrollTop < scrollHeight - clientHeight;
    });

    const [scrollable] = useAtom((ctx) => {
      const [modalHeight = 0, contentHeight = 0] = ctx.spy(heightAtom);
      return modalHeight < contentHeight;
    });

    useEffect(() => {
      if (isOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
    }, [isOpen]);

    useGlobalKeys({
      Escape: (e: KeyboardEvent) => isOpen && onEsc && onEsc(e),
    });

    useElementAtomEventListener(scrollElAtom, 'scroll', updateScrollTop);

    useUpdate(updateScrollTop, [scrollElAtom]);

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
              ref={modalRefForked}
            >
              <div
                className={cnModal('Scroll', cnMixScrollBar({ size: 's' }))}
                ref={scrollRefCallback}
              >
                <div className={cnModal('Content')} ref={contentRefCallback}>
                  <PortalWithThemeConsumer
                    onClickOutside={onClickOutside || onOverlayClick}
                    ignoreClicksInsideRefs={[
                      ...(refsForExcludeClickOutside || []),
                      modalRef,
                    ]}
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
