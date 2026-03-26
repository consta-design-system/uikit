import { reatomComponent as reatomComponentOriginal } from '@reatom/react';
import React, { forwardRef } from 'react';

export const reatomComponent = <
  R extends HTMLElement | SVGElement,
  P extends {},
>(
  render: (
    props: React.PropsWithoutRef<P>,
    ref: React.Ref<R>,
  ) => React.ReactNode,
) =>
  forwardRef<R, P>((props, ref) =>
    reatomComponentOriginal<React.PropsWithoutRef<P>>((props) =>
      render(props, ref),
    )(props),
  );
