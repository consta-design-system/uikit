import './Sidebar.css';

import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PortalWithTheme, usePortalContext } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

type DivProps = JSX.IntrinsicElements['div'];

const sidebarPropPosition = ['right', 'bottom', 'left', 'top'] as const;
type SidebarPropPosition = typeof sidebarPropPosition[number];
const sidebarPropPositionDefault: SidebarPropPosition = sidebarPropPosition[0];

const sidebarPropWidth = ['auto'] as const;
type SidebarPropWidth = typeof sidebarPropWidth[number];
const sidebarPropWidthDefault: SidebarPropWidth = sidebarPropWidth[0];

const sidebarPropHeight = ['auto'] as const;
type SidebarPropHeight = typeof sidebarPropHeight[number];
const sidebarPropHeightDefault: SidebarPropHeight = sidebarPropHeight[0];

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  hasOverlay?: boolean;
  onOverlayClick?: (event: MouseEvent) => void;
  onClickOutside?: (event: MouseEvent) => void;
  position?: SidebarPropPosition;
  width?: SidebarPropWidth;
  height?: SidebarPropHeight;
  className?: string;
  children?: React.ReactNode;
  container?: HTMLDivElement | undefined;
};

type SidebarContentProps = {
  className?: string;
  children: React.ReactNode;
};

type SidebarActionsProps = {
  className?: string;
  children: React.ReactNode;
};

const cnSidebar = cn('Sidebar');

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
    position = sidebarPropPositionDefault,
    width = sidebarPropWidthDefault,
    height = sidebarPropHeightDefault,
    className,
    children,
    container = window.document.body,
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
      className={cnSidebar({ position })}
      classNames={cnForCssTransition(cnSidebar)}
      timeout={200}
    >
      <PortalWithTheme preset={theme} container={container}>
        {hasOverlay && <div className={cnSidebar('Overlay')} aria-label="Overlay" />}
        <div
          className={cnSidebar('Window', { width, height, position }, [className])}
          ref={ref}
          {...rest}
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
