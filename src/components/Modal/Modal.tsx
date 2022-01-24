import './Modal.css';

import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { useGlobalKeys } from '../../hooks/useGlobalKeys/useGlobalKeys';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { PortalWithTheme, usePortalContext } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

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
}> = ({ onClickOutside, children, ignoreClicksInsideRefs }) => {
  const { refs } = usePortalContext();

  useClickOutside({
    isActive: !!onClickOutside,
    ignoreClicksInsideRefs: [...(ignoreClicksInsideRefs || []), ...(refs || [])],
    handler: (event: MouseEvent) => onClickOutside?.(event),
  });

  return <>{children}</>;
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
    <CSSTransition
      in={isOpen}
      unmountOnExit
      appear
      classNames={cnForCssTransition(cnModal)}
      timeout={200}
      nodeRef={portalRef}
    >
      <PortalWithTheme
        preset={theme}
        container={container}
        className={cnModal({ hasOverlay }, [rootClassName])}
        ref={portalRef}
        style={typeof style?.zIndex === 'number' ? { zIndex: style.zIndex } : undefined}
      >
        {hasOverlay && <div className={cnModal('Overlay')} aria-label="Overlay" />}
        <div
          {...otherProps}
          style={{
            ...style,
            ...(typeof style?.zIndex === 'number' && { zIndex: style?.zIndex + 1 }),
          }}
          className={cnModal('Window', { width, position }, [className])}
          ref={ref}
        >
          <ContextConsumer
            onClickOutside={onClickOutside || onOverlayClick}
            ignoreClicksInsideRefs={[...(refsForExcludeClickOutside || []), ref]}
          >
            {children}
          </ContextConsumer>
        </div>
      </PortalWithTheme>
    </CSSTransition>
  );
};
