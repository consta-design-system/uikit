import { AsTagAttribute } from '##/utils/types/AsTags';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

const sidebarPropPosition = ['right', 'bottom', 'left', 'top'] as const;
type SidebarPropPosition = typeof sidebarPropPosition[number];

export const sidebarPropSize = [
  's',
  'm',
  'l',
  'full',
  'none',
  '1/2',
  '1/3',
  '1/4',
  '2/3',
  '3/4',
] as const;

export type SidebarPropSize = typeof sidebarPropSize[number];

export type SidebarProps = PropsWithHTMLAttributes<
  {
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    hasOverlay?: boolean;
    onClickOutside?: (event: MouseEvent) => void;
    onEsc?: (event: KeyboardEvent) => void;
    position?: SidebarPropPosition;
    size?: SidebarPropSize;
    rootClassName?: string;
    children?: React.ReactNode;
    container?: HTMLDivElement | React.RefObject<HTMLDivElement>;
    afterClose?: () => void;
    refsForExcludeClickOutside?: React.RefObject<HTMLElement>[];
  },
  HTMLDivElement
>;

/**
 * @deprecated
 */
export type SidebarContentProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * @deprecated
 */
export type SidebarActionsProps = {
  className?: string;
  children: React.ReactNode;
};

export interface SidebarComponent
  extends React.FC<SidebarProps>,
    AsTagAttribute<'div'> {
  /**
   * @deprecated
   */
  Content: React.FC<SidebarContentProps>;
  /**
   * @deprecated
   */
  Actions: React.FC<SidebarActionsProps>;
}
