import React, { forwardRef, JSXElementConstructor } from 'react';

export const withDefaultProps = <
  COMPONENT_TYPE extends JSXElementConstructor<any>,
>(
  component: COMPONENT_TYPE,
  defaultProps?: React.ComponentProps<COMPONENT_TYPE>,
) => {
  type ComponentProps = React.ComponentProps<COMPONENT_TYPE>;

  return forwardRef<HTMLElement, ComponentProps>((props, ref) => {
    const Component =
      component as unknown as React.ComponentType<ComponentProps>;

    return <Component ref={ref} {...(defaultProps ?? {})} {...props} />;
  });
};
