import React, { useRef } from 'react';

import { useComponentBreakpoints } from '##/hooks/useComponentBreakpointsDeprecated/useComponentBreakpointsDeprecated';

export const UseComponentBreakpointsExample = () => {
  const ref = useRef<HTMLDivElement>(null);
  const breakPoints = useComponentBreakpoints(ref, { mobile: 0, desktop: 800 });

  console.log(breakPoints);

  return <div ref={ref}>dd</div>;
};
