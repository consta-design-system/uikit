import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { Theme, ThemeProps } from '../Theme/Theme';
import {
  PortalWithThemeProvider,
  usePortalContext,
} from './PortalWithThemeContext/PortalWithThemeContext';

export { usePortalContext };

type Props = {
  container?: Element | React.RefObject<HTMLElement>;
} & ThemeProps;

const getZIndex = (contextZIndex?: number, propZIndex?: number | string) => {
  if (typeof propZIndex === 'number') {
    return propZIndex;
  }

  if (contextZIndex) {
    return contextZIndex + 1;
  }

  return undefined;
};

const isRef = (
  ref: React.RefObject<HTMLElement> | Element | undefined,
): ref is React.RefObject<HTMLElement> =>
  !!ref && 'current' in ref && ref.current instanceof HTMLElement;

const getElement = (ref: React.RefObject<HTMLElement> | Element) =>
  isRef(ref) ? ref.current : ref;

export const PortalWithTheme = React.forwardRef<HTMLDivElement, Props>(
  (
    { children, container = window.document.body, style: styleProp, ...rest },
    ref,
  ) => {
    const { addRefs, zIndex: zIndexContext } = usePortalContext();
    const [portalContainer, setPortalContainer] = useState<Element | null>(
      getElement(container),
    );

    const themeRef = useRef(null);

    const zIndex = getZIndex(zIndexContext, styleProp?.zIndex);

    const themeRefForked = useForkRef([themeRef, ref]);

    useEffect(() => {
      addRefs && addRefs([themeRef]);
    }, [themeRef]);

    useEffect(() => {
      setPortalContainer(getElement(container));
    }, [getElement(container)]);

    if (!portalContainer) {
      return null;
    }

    return ReactDOM.createPortal(
      <PortalWithThemeProvider zIndex={zIndex}>
        <Theme
          {...rest}
          ref={themeRefForked}
          style={{
            ...styleProp,
            zIndex,
          }}
        >
          {children}
        </Theme>
      </PortalWithThemeProvider>,
      portalContainer,
    );
  },
);
