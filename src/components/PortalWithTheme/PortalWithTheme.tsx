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

export const PortalWithTheme = React.forwardRef<HTMLDivElement, Props>(
  ({ children, container = window.document.body, ...rest }, ref) => {
    const { addRefs } = usePortalContext();
    const themeRef = useRef(null);

    useEffect(() => {
      addRefs && addRefs([themeRef]);
    }, [themeRef]);

    return ReactDOM.createPortal(
      <PortalWithThemeProvider>
        <Theme ref={useForkRef([themeRef, ref])} {...rest}>
          {children}
        </Theme>
      </PortalWithThemeProvider>,
      container,
    );
  },
);
