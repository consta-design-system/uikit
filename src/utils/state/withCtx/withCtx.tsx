import { reatomContext, useCreateCtx } from '@reatom/npm-react';
import React, { createElement, forwardRef, useContext } from 'react';

const ProviderWithCtx = ({ children }: { children: React.ReactNode }) => (
  <reatomContext.Provider value={useCreateCtx()}>
    {children}
  </reatomContext.Provider>
);

export const withCtx = <C, P extends {}>(component: C): C =>
  forwardRef<HTMLElement, P>((props, ref) => {
    const element = createElement(
      component as unknown as React.ComponentType<P>,
      {
        ...(props as P),
        ref,
      },
    );

    if (useContext(reatomContext)) {
      return element;
    }

    return <ProviderWithCtx>{element}</ProviderWithCtx>;
  }) as unknown as C;
