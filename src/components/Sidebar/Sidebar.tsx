import './Sidebar.css';

import React, { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

import {
  PortalWithTheme,
  PortalWithThemeConsumer,
} from '##/components/PortalWithTheme';
import { useTheme } from '##/components/Theme/Theme';
import { useGlobalKeys } from '##/hooks/useGlobalKeys';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';
import { AsTagAttribute } from '##/utils/types/AsTags';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

const sidebarPropPosition = ['right', 'bottom', 'left', 'top'] as const;
type SidebarPropPosition = typeof sidebarPropPosition[number];
const sidebarPropPositionDefault: SidebarPropPosition = sidebarPropPosition[0];

export const sidebarPropSize = [
  's',
  'm',
  'l',
  'full',
  '1/2',
  '1/3',
  '1/4',
  '2/3',
  '3/4',
] as const;

export type SidebarPropSize = typeof sidebarPropSize[number];
const sidebarPropSizeDefault: SidebarPropSize = sidebarPropSize[1];

type SidebarProps = PropsWithHTMLAttributes<
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
    container?: HTMLDivElement | undefined;
    afterClose?: () => void;
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

const SidebarContent: React.FC<SidebarContentProps> = ({
  className,
  children,
  ...rest
}) => (
  <div
    className={cnSidebar('Content', [className, cnMixScrollBar()])}
    {...rest}
  >
    {children}
  </div>
);

const SidebarActions: React.FC<SidebarActionsProps> = ({
  className,
  children,
  ...rest
}) => (
  <div className={cnSidebar('Actions', [className])} {...rest}>
    {children}
  </div>
);

interface SidebarComponent
  extends React.FC<SidebarProps>,
    AsTagAttribute<'div'> {
  Content: typeof SidebarContent;
  Actions: typeof SidebarActions;
}

export const Sidebar: SidebarComponent = (props) => {
  const {
    isOpen,
    onClose,
    onOpen,
    hasOverlay = true,
    onClickOutside,
    onEsc,
    position = sidebarPropPositionDefault,
    size = sidebarPropSizeDefault,
    className,
    children,
    container = window.document.body,
    style,
    rootClassName,
    afterClose,
    ...otherProps
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const portalRef = useRef<HTMLDivElement>(null);

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
    <Transition
      in={isOpen}
      unmountOnExit
      timeout={240}
      nodeRef={portalRef}
      onExiting={afterClose}
    >
      {(animate) => (
        <PortalWithTheme
          preset={theme}
          ref={portalRef}
          container={container}
          className={cnSidebar({ position, hasOverlay }, [rootClassName])}
          style={
            typeof style?.zIndex === 'number'
              ? { zIndex: style.zIndex }
              : undefined
          }
        >
          {hasOverlay && (
            <div
              className={cnSidebar('Overlay', { animate })}
              aria-label="Overlay"
            />
          )}
          <div
            {...otherProps}
            style={{
              ...style,
              zIndex: undefined,
            }}
            className={cnSidebar('Window', { size, position, animate }, [
              className,
            ])}
            ref={ref}
          >
            <PortalWithThemeConsumer
              onClickOutside={onClickOutside}
              ignoreClicksInsideRefs={[ref]}
            >
              {children}
            </PortalWithThemeConsumer>
          </div>
        </PortalWithTheme>
      )}
    </Transition>
  );
};

Sidebar.Content = SidebarContent;
Sidebar.Actions = SidebarActions;
