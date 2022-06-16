import React from 'react';
import { useRouter, useRoute } from 'react-router5'; 
import { routesNames } from '##/modules/router';
import { Tabs } from '@consta/uikit/TabsCanary';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { NavigationItem } from '../helpers'

type Props = {
    items: NavigationItem[];
    standId?: string;
    libId?: string;
    className?: string;
    onChange?: (type: string) => void;
}

export const StandPageNavigation = (props: Props) => {
    const { standId = '', libId = '', onChange, className, items } = props;
    const router = useRouter();
    const route = useRoute();
    const routeName = route.route.name;

    const value = useMemo(() => {
        return items.filter((item) => {
            return item.route === routeName
        })[0];
    }, [route, items])
    
    useEffect(() => {
        onChange?.(value.route)
    }, [value])

    const handleClick = (item: NavigationItem) => {
        router.navigate(item.route, { libId, standId });
    }

    return (
        <Tabs 
            items={items}
            onChange={({ value }) => handleClick(value)}
            size="m"
            className={className}
            value={value}
        />   
    )
}