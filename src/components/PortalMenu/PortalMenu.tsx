import './PortalMenu.css';

import React, { forwardRef, useEffect, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cn } from '../../utils/bem';

import { PortalMenuNavigation } from './PortalMenuNavigation/PortalMenuNavigation';
import { PortalMenuPackage } from './PortalMenuPackage/PortalMenuPackage';
import { withDefaultGetters } from './helper';
import {
  DefaultMenuGroup,
  DefaultNavigationItem,
  DefaultPackageItem,
  PortalMenuComponent,
  PortalMenuProps,
} from './types';

const cnPortalMenu = cn('PortalMenu');

function PortalMenuRender<
  NAVIGATION = DefaultNavigationItem,
  MENU = DefaultPackageItem,
  GROUP = DefaultMenuGroup
>(props: PortalMenuProps<NAVIGATION, MENU, GROUP>, ref: React.Ref<HTMLDivElement>) {
  const {
    className,
    additionalControls,
    view,

    // groups
    groups,
    getGroupKey,
    getGroupLabel,

    // packages
    packages,
    onPackageClick,
    getPackageActive,
    getPackageBadgeStatus,
    getPackageDescription,
    getPackageLabel,
    getPackageOnClick,
    getPackageBadgeLabel,
    getPackageGroupId,
    getPackageBadgeView,
    getPackageKey,

    // navigation
    navigation,
    onNavigationClick,
    getNavigationActive,
    getNavigationKey,
    getNavigationLabel,
    getNavigationOnClick,
    getNavigationSubMenu,
    ...otherProps
  } = withDefaultGetters(props);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [view]);

  return (
    <div
      className={cnPortalMenu(null, [className])}
      ref={useForkRef([containerRef, ref])}
      {...otherProps}
    >
      {additionalControls}
      {view !== 'components' && navigation && (
        <PortalMenuNavigation
          navigation={navigation}
          onNavigationClick={onNavigationClick}
          className={cnPortalMenu('Navigation')}
          getNavigationActive={getNavigationActive}
          getNavigationKey={getNavigationKey}
          getNavigationLabel={getNavigationLabel}
          getNavigationOnClick={getNavigationOnClick}
          getNavigationSubMenu={getNavigationSubMenu}
        />
      )}
      {view !== 'navigation' && packages && (
        <PortalMenuPackage
          packages={packages}
          groups={groups}
          className={cnPortalMenu('Packages')}
          getGroupKey={getGroupKey}
          onPackageClick={onPackageClick}
          getGroupLabel={getGroupLabel}
          getPackageActive={getPackageActive}
          getPackageBadgeStatus={getPackageBadgeStatus}
          getPackageDescription={getPackageDescription}
          getPackageLabel={getPackageLabel}
          getPackageOnClick={getPackageOnClick}
          getPackageBadgeLabel={getPackageBadgeLabel}
          getPackageBadgeView={getPackageBadgeView}
          getPackageGroupId={getPackageGroupId}
          getPackageKey={getPackageKey}
        />
      )}
    </div>
  );
}

export const PortalMenu = forwardRef(PortalMenuRender) as PortalMenuComponent;

export * from './types';
