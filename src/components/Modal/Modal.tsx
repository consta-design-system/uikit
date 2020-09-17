import './Modal.css';

import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PortalWithTheme } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

const modalPropWidth = ['auto'] as const;
type TModalPropWidth = typeof modalPropWidth[number];
const modalPropWidthDefault: TModalPropWidth = modalPropWidth[0];

const modalPropPosition = ['center', 'top'] as const;
type TModalPropPosition = typeof modalPropPosition[number];
const modalPropPositionDefault: TModalPropPosition = modalPropPosition[0];

type TModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  hasOverlay?: boolean;
  onOverlayClick?: (event: MouseEvent) => void;
  className?: string;
  width?: TModalPropWidth;
  position?: TModalPropPosition;
  children?: React.ReactNode;
  container?: HTMLDivElement | undefined;
};

const cnModal = cn('Modal');

export const Modal: React.FC<TModalProps> = (props) => {
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
    <CSSTransition in={isOpen} unmountOnExit classNames={cnForCssTransition(cnModal)} timeout={200}>
      <PortalWithTheme preset={theme} container={container}>
        {hasOverlay && <div className={cnModal('Overlay')} aria-label="Оверлэй" />}
        <div className={cnModal('Window', { width, position }, [className])} ref={ref} {...rest}>
          {children}
        </div>
      </PortalWithTheme>
    </CSSTransition>
  );
};
