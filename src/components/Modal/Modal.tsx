import './Modal.css';

import React, { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

import {
  PortalWithTheme,
  PortalWithThemeConsumer,
} from '##/components/PortalWithTheme';
import { useTheme } from '##/components/Theme/Theme';
import { useGlobalKeys } from '##/hooks/useGlobalKeys';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

const modalPropWidth = ['auto'] as const;
type ModalPropWidth = typeof modalPropWidth[number];
const modalPropWidthDefault: ModalPropWidth = modalPropWidth[0];

const modalPropPosition = ['center', 'top'] as const;
type ModalPropPosition = typeof modalPropPosition[number];
const modalPropPositionDefault: ModalPropPosition = modalPropPosition[0];

type ModalProps = PropsWithHTMLAttributes<
  {
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    hasOverlay?: boolean;
    /** @deprecated use onClickOutside */
    onOverlayClick?: (event: MouseEvent) => void;
    onClickOutside?: (event: MouseEvent) => void;
    onEsc?: (event: KeyboardEvent) => void;
    rootClassName?: string;
    width?: ModalPropWidth;
    position?: ModalPropPosition;
    children?: React.ReactNode;
    container?: HTMLDivElement | undefined;
    afterClose?: () => void;
    refsForExcludeClickOutside?: React.RefObject<HTMLElement>[];
  },
  HTMLDivElement
>;

const cnModal = cn('Modal');

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    onOpen,
    hasOverlay = true,
    onOverlayClick,
    onClickOutside,
    onEsc,
    className,
    width = modalPropWidthDefault,
    position = modalPropPositionDefault,
    children,
    container = window.document.body,
    refsForExcludeClickOutside,
    rootClassName,
    afterClose,
    style,
    ...otherProps
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

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
          style={
            typeof style?.zIndex === 'number'
              ? { zIndex: style.zIndex }
              : undefined
          }
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
            className={cnModal('Window', { width, position }, [
              cnMixPopoverAnimate({ animate }),
              className,
              cnMixScrollBar(),
            ])}
            ref={ref}
          >
            <PortalWithThemeConsumer
              onClickOutside={onClickOutside || onOverlayClick}
              ignoreClicksInsideRefs={[
                ...(refsForExcludeClickOutside || []),
                ref,
              ]}
            >
              {children}
            </PortalWithThemeConsumer>
          </div>
        </PortalWithTheme>
      )}
    </Transition>
  );
};
