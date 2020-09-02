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
  className?: string;
  children?: React.ReactNode;
};

const cnModal = cn('Modal');

export const Modal: React.FC<TModalProps> = (props) => {
  const { isOpen, onClose, hasCloseButton = true, className, children, ...rest } = props;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const onCloseModal = (e: React.MouseEvent): void => {
    if (isOpen) {
      onClose(e);
    }
  };

  useClickOutside({
    isActive: !!onCloseModal,
    ignoreClicksInsideRefs: [ref],
    handler: (event: any) => onCloseModal(event),
  });

  const modal = (
    <PortalWithTheme preset={theme} container={window.document.body}>
      <div className={cnModal('root', [className])} ref={ref} {...rest}>
        {hasCloseButton && (
          <Button
            className={cnModal('closeButton')}
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
      <button type="button" onClick={onCloseModal} className={cnModal('overlay')} />
    </PortalWithTheme>
  );

  return isOpen ? modal : null;
};
