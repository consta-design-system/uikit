import React from 'react';
import ReactDOM from 'react-dom';

import { Theme, ThemeProps } from '../Theme/Theme';

type Props = {
  container?: Element;
} & ThemeProps;

export const PortalWithTheme = React.forwardRef<HTMLDivElement, Props>(
  ({ children, container = window.document.body, ...rest }, ref) =>
    ReactDOM.createPortal(
      <Theme ref={ref} {...rest}>
        {children}
      </Theme>,
      container,
    ),
);
