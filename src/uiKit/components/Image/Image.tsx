import './Image.css';

import React from 'react';

import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { cn } from '../../cn';

export type StoryBookModsProps = PropsWithJsxAttributes<{}, 'img'>;

export const cnImage = cn('Image');

export const Image: React.FC<StoryBookModsProps> = (props) => {
  const { className, alt, ...otherProps } = props;

  return (
    <img {...otherProps} className={cnImage(null, [className])} alt={alt} />
  );
};

export const createImageComponent = (src: string) =>
  function () {
    return <Image src={src} />;
  };
