import React from 'react';

export const Blockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => {
  const { children, ...otherProps } = props;

  return <blockquote {...otherProps}>{children}</blockquote>;
};
