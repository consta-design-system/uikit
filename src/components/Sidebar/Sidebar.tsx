import './Sidebar.css';

import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { useGlobalKeys } from '../../hooks/useGlobalKeys/useGlobalKeys';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { PortalWithTheme, usePortalContext } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

type DivProps = JSX.IntrinsicElements['div'];

const sidebarPropPosition = ['right', 'bottom', 'left', 'top'] as const;
type SidebarPropPosition = typeof sidebarPropPosition[number];
const sidebarPropPositionDefault: SidebarPropPosition = sidebarPropPosition[0];

export const sidebarPropSize = ['s', 'm', 'l', 'full', '1/2', '1/3', '1/4', '2/3', '3/4'] as const;

export type SidebarPropSize = typeof sidebarPropSize[number];
const sidebarPropSizeDefault: SidebarPropSize = sidebarPropSize[1];

type SidebarProps = PropsWithHTMLAttributes<
  {
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    hasOverlay?: boolean;
    /** @deprecated Use onClickOutside */
    onOverlayClick?: (event: MouseEvent) => void;
    onClickOutside?: (event: MouseEvent) => void;
    onEsc?: (event: KeyboardEvent) => void;
    position?: SidebarPropPosition;
    size?: SidebarPropSize;
    rootClassName?: string;
    children?: React.ReactNode;
    container?: HTMLDivElement | undefined;
  },
  HTMLDivElement
>;

type SidebarContentProps = {
  className?: string;
  children: React.ReactNode;
};

type SidebarActionsProps = {
  className?: string;
  children: React.ReactNode;
};

export const cnSidebar = cn('Sidebar');

const SidebarContent: React.FC<SidebarContentProps> = ({ className, children, ...rest }) => (
  <div className={cnSidebar('Content', null, [className])} {...rest}>
    {children}
  </div>
);

const SidebarActions: React.FC<SidebarActionsProps> = ({ className, children, ...rest }) => (
  <div className={cnSidebar('Actions', null, [className])} {...rest}>
    {children}
  </div>
);

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

interface SidebarComponent extends React.FC<SidebarProps>, DivProps {
  Content: typeof SidebarContent;
  Actions: typeof SidebarActions;
}

export const Sidebar: SidebarComponent = (props) => {
  const {
    isOpen,
    onClose,
    onOpen,
    hasOverlay = true,
    onOverlayClick,
    onClickOutside,
    onEsc,
    position = sidebarPropPositionDefault,
    size = sidebarPropSizeDefault,
    className,
    children,
    container = window.document.body,
    style,
    rootClassName,
    ...otherProps
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

  useGlobalKeys({
    Escape: (e) => isOpen && onEsc && onEsc(e),
  });

  return (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      className={cnSidebar({ position })}
      classNames={cnForCssTransition(cnSidebar)}
      timeout={200}
    >
      <PortalWithTheme
        preset={theme}
        container={container}
        className={rootClassName}
        style={typeof style?.zIndex === 'number' ? { zIndex: style.zIndex } : undefined}
      >
        {hasOverlay && <div className={cnSidebar('Overlay')} aria-label="Overlay" />}
        <div
          {...otherProps}
          style={{
            ...style,
            ...(typeof style?.zIndex === 'number' && { zIndex: style?.zIndex + 1 }),
          }}
          className={cnSidebar('Window', { size, position }, [className])}
          ref={ref}
        >
          <ContextConsumer
            onClickOutside={onClickOutside || onOverlayClick}
            ignoreClicksInsideRefs={[ref]}
          >
            {children}
          </ContextConsumer>
        </div>
      </PortalWithTheme>
    </CSSTransition>
  );
};

Sidebar.Content = SidebarContent;
Sidebar.Actions = SidebarActions;
