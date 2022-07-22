import React from 'react';
import { useRouter, useRoute } from 'react-router5';
import { Tabs } from '@consta/uikit/TabsCanary';
import { useMemo } from 'react';
import { NavigationItem } from '##/containers/StandPage/StandPageNavigation/helpers';
import { useStand } from '../useStand';
import { navigationList } from './helpers';

type Props = {
  className?: string;
};

export const StandPageNavigation = (props: Props) => {
  const { className } = props;
  const router = useRouter();
  const route = useRoute();
  const stand = useStand();

  const value = useMemo(() => {
    return navigationList.find((item) => item.id === route.route.name) as NavigationItem;
  }, [route]);

  const handleClick = ({ value }: { value: NavigationItem }) => {
    router.navigate(value.id, { stand: stand?.id });
  };

  return (
    <Tabs
      items={navigationList}
      onChange={handleClick}
      size="m"
      className={className}
      value={value}
    />
  );
};
