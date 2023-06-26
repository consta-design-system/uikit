import React, { createContext } from 'react';

import { WithTooltipProps } from './types';

export const TooltipPropsContext = createContext<WithTooltipProps>({});

type Props = WithTooltipProps & {
  children?: React.ReactNode;
};

export const TooltipPropsProvider = ({ children, ...props }: Props) => (
  <TooltipPropsContext.Provider value={props}>
    {children}
  </TooltipPropsContext.Provider>
);
