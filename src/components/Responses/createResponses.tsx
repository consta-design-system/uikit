import React from 'react';

import { ResponsesImageProps } from '../../responsesImages/ResponsesImage/ResponsesImage';
import { cnResponses, Responses, ResponsesProps } from './Responses';

type CreateResponsesArguments = {
  name: string;
  image: React.FC<ResponsesImageProps>;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

export function createResponses({
  name,
  image,
  title,
  description,
  actions,
}: CreateResponsesArguments) {
  const ResponsesComponent = React.forwardRef<
    HTMLDivElement,
    Omit<ResponsesProps, 'image'>
  >((props, ref) => {
    return (
      <Responses
        {...props}
        ref={ref}
        className={cnResponses(null, [name, props.className])}
        title={props.title || title}
        description={props.description || description}
        actions={props.actions || actions}
        image={image}
      />
    );
  });

  return ResponsesComponent;
}
