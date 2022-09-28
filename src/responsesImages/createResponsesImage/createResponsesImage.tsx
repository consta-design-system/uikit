import React from 'react';

import {
  cnResponsesImage,
  ResponsesImage,
  ResponsesImageProps,
} from '../ResponsesImage/ResponsesImage';

type ImageComponent = React.FC<React.SVGProps<SVGSVGElement>>;
type CreateResponsesImageArguments = {
  name: string;
  component: ImageComponent;
};

export function createResponsesImage({
  name,
  component: Svg,
}: CreateResponsesImageArguments) {
  const IconComponent: React.FC<ResponsesImageProps> = (props) => {
    return (
      <ResponsesImage
        {...props}
        className={cnResponsesImage(null, [name, props.className])}
      >
        <Svg className={cnResponsesImage('Svg')} />
      </ResponsesImage>
    );
  };

  return IconComponent;
}
