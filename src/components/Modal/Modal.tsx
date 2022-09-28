import './Modal.css';

import React, { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

import {
  PortalWithTheme,
  usePortalContext,
} from '##/components/PortalWithTheme';
import { useTheme } from '##/components/Theme/Theme';
import { useClickOutside } from '##/hooks/useClickOutside';
import { useGlobalKeys } from '##/hooks/useGlobalKeys';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
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

/**
 * Подписчик на PortalWithThemeProvider
 * получает рефы всех вложенных порталов в модалку
 * для дальнейшего исключения их из useClickOutside
 */
const ContextConsumer: React.FC<{
  onClickOutside?: (event: MouseEvent) => void;
  ignoreClicksInsideRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
  children: React.ReactNode;
}> = ({ onClickOutside, children, ignoreClicksInsideRefs }) => {
  const { refs } = usePortalContext();

  useClickOutside({
    isActive: !!onClickOutside,
    ignoreClicksInsideRefs: [
      ...(ignoreClicksInsideRefs || []),
      ...(refs || []),
    ],
    handler: onClickOutside,
  });

  return children as React.ReactElement;
};

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
            ])}
            ref={ref}
          >
            <ContextConsumer
              onClickOutside={onClickOutside || onOverlayClick}
              ignoreClicksInsideRefs={[
                ...(refsForExcludeClickOutside || []),
                ref,
              ]}
            >
              {children}
            </ContextConsumer>
          </div>
        </PortalWithTheme>
      )}
    </Transition>
  );
};
