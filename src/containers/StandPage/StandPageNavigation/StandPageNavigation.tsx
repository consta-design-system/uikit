import React from 'react';
import { useRouter, useRoute } from 'react-router5';
import { Tabs } from '@consta/uikit/TabsCanary';
import { useMemo } from 'react';
import { NavigationItem } from '@consta/stand/src/containers/StandPage/StandPageNavigation/helpers';
import { useStand } from '../useStand';
import { navigationList } from './helpers';

type Props = {
  className?: string;
};

export const StandPageNavigation = (props: Props) => {
  const { className } = props;
  const router = useRouter();
  const route = useRoute();
  const routeName = route.route.name;
  const stand = useStand();

  const value = useMemo(() => {
    return navigationList.find((item) => {
      return item.routeName === routeName;
    }) as NavigationItem;
  }, [route]);

  const handleClick = (item: NavigationItem) => {
    router.navigate(item.routeName, { libId: stand?.lib.id, standId: stand?.id });
  };

  return (
    <Tabs
      items={navigationList}
      onChange={({ value }) => handleClick(value)}
      size="m"
      className={className}
      value={value}
    />
  );
};
