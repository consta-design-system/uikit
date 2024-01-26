import React, { useRef } from 'react';

import { useComponentBreakpoints } from '##/hooks/useComponentBreakpointsDepricated/useComponentBreakpointsDepricated';

export const UseComponentBreakpointsExample = () => {
  const ref = useRef<HTMLDivElement>(null);
  const breakPoints = useComponentBreakpoints(ref, { mobile: 0, desctop: 800 });

  console.log(breakPoints);

  return <div ref={ref}>dd</div>;
};
