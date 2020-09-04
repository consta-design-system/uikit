import './Modal.css';

import React from 'react';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { IconClose } from '../../icons/IconClose/IconClose';
import { cn } from '../../utils/bem';
import { Button } from '../Button/Button';
import { PortalWithTheme } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

type TModalProps = {
  isOpen?: boolean;
  onClose: (e: React.MouseEvent) => void;
  hasCloseButton?: boolean;
  closeByClickOnOverlay?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const cnModal = cn('Modal');

export const Modal: React.FC<TModalProps> = (props) => {
  const { isOpen, onClose, hasCloseButton = true, closeByClickOnOverlay = true, className, children, ...rest } = props;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  React.useEffect(() => {
    if (isOpen) {
      window.document.body.style.top = `-${window.scrollY}px`;
      window.document.body.style.position = 'fixed';
    } else {
      const scrollY = window.document.body.style.top;
      window.document.body.style.position = '';
      window.document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen]);

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
    <PortalWithTheme preset={theme} container={window.document.body}>
      <div className={cnModal('Overlay')}>
        <div className={cnModal('Root', [className])} ref={ref} {...rest}>
          {hasCloseButton && (
            <Button
              className={cnModal('CloseButton')}
              view="clear"
              type="button"
              onClick={onCloseModal}
              onlyIcon
              iconLeft={IconClose}
              iconSize="s"
            />
          )}
          {children}
        </div>
      </div>
    </PortalWithTheme>
  );

  return isOpen ? modal : null;
};
