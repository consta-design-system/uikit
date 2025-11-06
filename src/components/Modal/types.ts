import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export type ModalProps = PropsWithHTMLAttributes<
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
    /** @deprecated use style or className */
    width?: 'auto';
    position?: 'center' | 'top';
    form?: 'brick' | 'default';
    border?: boolean;
    children?: React.ReactNode;
    container?: HTMLElement | React.RefObject<HTMLElement>;
    afterClose?: () => void;
    /** @deprecated use ignoreOutsideClicksRefs */
    refsForExcludeClickOutside?: React.RefObject<HTMLElement>[];
    ignoreOutsideClicksRefs?: React.RefObject<HTMLElement>[];
  },
  HTMLDivElement
>;
