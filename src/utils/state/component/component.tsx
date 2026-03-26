import { Computed, wrap } from '@reatom/core';
import { reatomFactoryComponent } from '@reatom/react';
import React, { forwardRef, useCallback } from 'react';

import { useSendToAtom } from '../useSendToAtom';

export type FactoryInitProps<R, P> = React.PropsWithoutRef<P> & {
  ref: React.Ref<R>;
};
export type FactoryPropsAtom<R, P> = Computed<
  React.PropsWithoutRef<P> & { ref: React.Ref<R> }
>;

export type FactoryRender<R, P> = (
  props: React.PropsWithoutRef<P> & { ref: React.Ref<R> },
) => React.ReactNode;

export type FactoryCb<R, P> = (
  initProps: FactoryInitProps<R, P>,
  propsAtom: FactoryPropsAtom<R, P>,
) => FactoryRender<R, P>;

export const factoryComponent = <
  R extends HTMLElement | SVGElement,
  P extends {},
>(
  cb: FactoryCb<R, P>,
  name?: string,
) =>
  forwardRef<R, P>((props, ref) => {
    const propsAtom = useSendToAtom({
      ...props,
      ref,
    });
    const factoryRender = useCallback(
      (render: FactoryCb<R, P>) => (initProps: React.PropsWithoutRef<P>) =>
        render({ ...initProps, ref }, propsAtom),
      [],
    );
    return reatomFactoryComponent<
      React.PropsWithoutRef<P> & { ref: React.Ref<R> }
    >(
      factoryRender(cb),
      name,
    )({ ...props, ref });
  });
