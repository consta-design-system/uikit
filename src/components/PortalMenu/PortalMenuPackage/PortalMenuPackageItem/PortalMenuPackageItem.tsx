import './PortalMenuPackageItem.css';

import React from 'react';

import { cn } from '../../../../utils/bem';
import { Badge } from '../../../Badge/Badge';
import { Text } from '../../../Text/Text';
import { PortalMenuPackageItemProps } from '../../types';

const cnPortalMenuMenuItem = cn('PortalMenuMenuItem');

export const PortalMenuPackageItem = <ITEM,>(props: PortalMenuPackageItemProps<ITEM>) => {
  const {
    item,
    onClick,
    className,
    getPackageOnClick,
    getPackageLabel,
    getPackageActive,
    getPackageDescription,
    getPackageBadgeLabel,
    getPackageBadgeStatus,
    getPackageBadgeView,
  } = props;

  const handleClick: React.MouseEventHandler = (e) => {
    onClick?.(e);
    getPackageOnClick(item)?.(e);
  };

  return (
    <button type="button" className={cnPortalMenuMenuItem(null, [className])} onClick={handleClick}>
      <div className={cnPortalMenuMenuItem('Text')}>
        <Text
          className={cnPortalMenuMenuItem('Label')}
          size="m"
          lineHeight="m"
          view={getPackageActive(item) ? 'brand' : 'primary'}
        >
          {getPackageLabel(item)}
        </Text>
        {getPackageDescription(item) && (
          <Text
            className={cnPortalMenuMenuItem('Description')}
            size="xs"
            lineHeight="m"
            view="secondary"
          >
            {getPackageDescription(item)}
          </Text>
        )}
      </div>
      {getPackageBadgeLabel(item) && (
        <Badge
          size="s"
          view={getPackageBadgeView(item) ?? 'stroked'}
          label={getPackageBadgeLabel(item)}
          status={getPackageBadgeStatus(item) ?? 'system'}
        />
      )}
    </button>
  );
};
