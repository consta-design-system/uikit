import './Modal.css';

import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PortalWithTheme, usePortalContext } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

const modalPropWidth = ['auto'] as const;
type ModalPropWidth = typeof modalPropWidth[number];
const modalPropWidthDefault: ModalPropWidth = modalPropWidth[0];

const modalPropPosition = ['center', 'top'] as const;
type ModalPropPosition = typeof modalPropPosition[number];
const modalPropPositionDefault: ModalPropPosition = modalPropPosition[0];

type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  hasOverlay?: boolean;
  onOverlayClick?: (event: MouseEvent) => void;
  onClickOutside?: (event: MouseEvent) => void;
  className?: string;
  rootClassName?: string;
  width?: ModalPropWidth;
  position?: ModalPropPosition;
  children?: React.ReactNode;
  container?: HTMLDivElement | undefined;
  refsForExcludeClickOutside?: React.RefObject<HTMLElement>[];
};

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
    className,
    width = modalPropWidthDefault,
    position = modalPropPositionDefault,
    children,
    container = window.document.body,
    refsForExcludeClickOutside,
    rootClassName,
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen]);

  return (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      appear
      classNames={cnForCssTransition(cnModal)}
      timeout={200}
    >
      <PortalWithTheme
        preset={theme}
        container={container}
        className={cnModal(null, [rootClassName])}
      >
        {hasOverlay && <div className={cnModal('Overlay')} aria-label="Overlay" />}
        <div className={cnModal('Window', { width, position }, [className])} ref={ref} {...rest}>
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
