import './Responses.css';

import React from 'react';

import { ResponsesImageProps } from '../../responsesImages/ResponsesImage/ResponsesImage';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export const responsesPropSize = ['l', 'm'] as const;
export type ResponsesPropSize = typeof responsesPropSize[number];
export const responsesPropSizeDefault: ResponsesPropSize = responsesPropSize[0];

export type ResponsesProps = PropsWithHTMLAttributes<
  {
    title?: React.ReactNode;
    description?: React.ReactNode;
    size?: ResponsesPropSize;
    image: React.FC<ResponsesImageProps>;
    actions?: React.ReactNode;
    children?: never;
  },
  HTMLDivElement
>;

export const cnResponses = cn('Responses');

export const Responses = React.forwardRef<HTMLDivElement, ResponsesProps>(
  (props, ref) => {
    const {
      className,
      title,
      description,
      size = responsesPropSizeDefault,
      image,
      actions,
    } = props;
    const Image = image;

    return (
      <div className={cnResponses({ size }, [className])} ref={ref}>
        <Image className={cnResponses('Image')} />
        {title && <h1 className={cnResponses('Title')}>{title}</h1>}
        {description && (
          <p className={cnResponses('Description')}>{description}</p>
        )}
        {actions && (
          <div className={cnResponses('ButtonsWrapper')}>{actions}</div>
        )}
      </div>
    );
  },
);
