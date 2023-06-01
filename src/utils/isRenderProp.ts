export const isRenderProp = <PROPS>(
  children: React.ReactNode | PROPS,
): children is PROPS => typeof children === 'function';
