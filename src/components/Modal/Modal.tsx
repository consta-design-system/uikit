import './Modal.css';

import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PortalWithTheme } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

const modalPropWidth = ['auto'] as const;
type ModalPropWidth = typeof modalPropWidth[number];
const modalPropWidthDefault: ModalPropWidth = modalPropWidth[0];

const modalPropPosition = ['center', 'top'] as const;
type ModalPropPosition = typeof modalPropPosition[number];
const modalPropPositionDefault: ModalPropPosition = modalPropPosition[0];

export const MODAL_TIMEOUT = 200;

export type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  hasOverlay?: boolean;
  onOverlayClick?: (event: MouseEvent) => void;
  className?: string;
  width?: ModalPropWidth;
  position?: ModalPropPosition;
  children?: React.ReactNode;
  container?: HTMLDivElement | undefined;
};

const cnModal = cn('Modal');

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    onOpen,
    hasOverlay = true,
    onOverlayClick,
    className,
    width = modalPropWidthDefault,
    position = modalPropPositionDefault,
    children,
    container = window.document.body,
    ...rest
  } = props;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useClickOutside({
    isActive: !!onOverlayClick,
    ignoreClicksInsideRefs: [ref],
    handler: (event: MouseEvent) => onOverlayClick?.(event),
  });

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
      timeout={MODAL_TIMEOUT}
    >
      <PortalWithTheme preset={theme} container={container}>
        {hasOverlay && <div className={cnModal('Overlay')} aria-label="Оверлэй" />}
        <div className={cnModal('Window', { width, position }, [className])} ref={ref} {...rest}>
          {children}
        </div>
      </PortalWithTheme>
    </CSSTransition>
  );
};
