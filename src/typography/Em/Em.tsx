import React from 'react';

export const Em = (props: React.HTMLAttributes<HTMLEmbedElement>) => {
  const { children, ...otherProps } = props;

  return <em {...otherProps}>{children}</em>;
};
