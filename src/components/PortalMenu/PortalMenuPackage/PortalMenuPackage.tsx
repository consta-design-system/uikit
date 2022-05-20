import './PortalMenuPackage.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getGroups } from '../../../utils/getGroups';
import { Text } from '../../Text/Text';
import { PortalMenuPackageProps } from '../types';

import { PortalMenuPackageItem } from './PortalMenuPackageItem/PortalMenuPackageItem';

const cnPortalMenuMenu = cn('PortalMenuMenu');

const renderHeader = (groupLabel: string | undefined, first: boolean): React.ReactNode | null => {
  if (!groupLabel) {
    if (first) {
      return null;
    }
    return <div className={cnPortalMenuMenu('Divider')} />;
  }
  return (
    <Text
      className={cnPortalMenuMenu('Header', { first })}
      size="xs"
      lineHeight="m"
      view="ghost"
      transform="uppercase"
    >
      {groupLabel}
    </Text>
  );
};

export const PortalMenuPackage = <ITEM, GROUP>(props: PortalMenuPackageProps<ITEM, GROUP>) => {
  const {
    packages,
    groups: groupsProp,
    sortGroup,
    getGroupKey,
    getPackageGroupId,
    getGroupLabel,
    className,
    onPackageClick,
    ...getters
  } = props;

  const groups = getGroups<ITEM, GROUP>(
    packages,
    getPackageGroupId,
    groupsProp,
    getGroupKey,
    sortGroup && ((a, b) => sortGroup(a.key, b.key)),
  );

  return (
    <div className={cnPortalMenuMenu(null, [className])}>
      {groups.map((group, groupIndex) => (
        <div className={cnPortalMenuMenu('Group')} key={group.key}>
          {renderHeader(group.group && getGroupLabel(group.group), groupIndex === 0)}
          {group.items.map((item, itemIndex) => {
            return (
              <PortalMenuPackageItem
                key={cnPortalMenuMenu('Item', { groupIndex, itemIndex })}
                item={item}
                onClick={(e) => onPackageClick?.({ e, item })}
                getPackageGroupId={getPackageGroupId}
                {...getters}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
