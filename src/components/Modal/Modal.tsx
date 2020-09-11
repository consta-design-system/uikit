import './Modal.css';

import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PortalWithTheme } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

type TModalPropWidth = 'auto';
type TModalPropPosition = 'center' | 'top';
type TModalProps = {
  isOpen?: boolean;
  onClose: (e: React.MouseEvent) => void;
  hasOverlay?: boolean;
  closeByClickOnOverlay?: boolean;
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
    hasOverlay = true,
    closeByClickOnOverlay = true,
    className,
    width = 'auto',
    position = 'center',
    children,
    container = window.document.body,
    ...rest
  } = props;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const onCloseModal = (e: React.MouseEvent): void => {
    if (isOpen) {
      onClose(e);
    }
  };

  useClickOutside({
    isActive: closeByClickOnOverlay,
    ignoreClicksInsideRefs: [ref],
    handler: (event: any) => onCloseModal(event),
  });

  const modal = (
    <PortalWithTheme preset={theme} container={container}>
      <TransitionGroup component={null} appear enter exit>
        <CSSTransition classNames={cnForCssTransition(cnModal)} timeout={200}>
          <div>
            {hasOverlay && <div className={cnModal('Overlay')} aria-label="Оверлэй" />}
            <div
              className={cnModal('Window', { width, position }, [className])}
              ref={ref}
              {...rest}
            >
              {children}
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </PortalWithTheme>
  );

  return isOpen ? modal : null;
};
