import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { Theme, ThemeProps } from '../Theme/Theme';
import {
  PortalWithThemeProvider,
  usePortalContext,
} from './PortalWithThemeContext/PortalWithThemeContext';

export { usePortalContext };

type Props = {
  container?: Element;
} & ThemeProps;

const getZIndex = (contextZindex?: number, propZindex?: number | string) => {
  if (typeof propZindex === 'number') {
    return propZindex;
  }

  if (contextZindex) {
    return contextZindex + 1;
  }

  return undefined;
};

export const PortalWithTheme = React.forwardRef<HTMLDivElement, Props>(
  (
    { children, container = window.document.body, style: styleProp, ...rest },
    ref,
  ) => {
    const { addRefs, zIndex: zIndexContext } = usePortalContext();

    const themeRef = useRef(null);

    const zIndex = getZIndex(zIndexContext, styleProp?.zIndex);

    const style = {
      ...styleProp,
      zIndex,
    };

    useEffect(() => {
      addRefs && addRefs([themeRef]);
    }, [themeRef]);

    return ReactDOM.createPortal(
      <PortalWithThemeProvider zIndex={zIndex}>
        <Theme ref={useForkRef([themeRef, ref])} style={style} {...rest}>
          {children}
        </Theme>
      </PortalWithThemeProvider>,
      container,
    );
  },
);
