import './BreadcrumbsFitModeScroll.css';

import React, { forwardRef, useEffect, useRef } from 'react';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { cn } from '../../../utils/bem';
import { BreadcrumbsFitModeScrollComponent } from '../types';

export const cnBreadcrumbsFitModeScroll = cn('BreadcrumbsFitModeScroll');

export const BreadcrumbsFitModeScroll: BreadcrumbsFitModeScrollComponent = forwardRef(
  (props, ref) => {
    const { items, className, renderItem, ...otherProps } = props;

    const rootRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
      rootRef.current?.scrollTo({
        left: rootRef.current?.scrollWidth,
      });
    }, []);

    return (
      <ul
        className={cnBreadcrumbsFitModeScroll(null, [className])}
        ref={useForkRef([rootRef, ref])}
        {...otherProps}
      >
        {items.map((item, index) =>
          renderItem(item, index, index === 0, index === items.length - 1),
        )}
      </ul>
    );
  },
);
