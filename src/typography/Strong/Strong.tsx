import React from 'react';

export const Strong = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  const { children, ...otherProps } = props;

  return <b {...otherProps}>{children}</b>;
};
