import { createIcon as iconsCreateIcon } from '@consta/icons/Icon';
import React from 'react';

type SizeComponent = React.FC<React.SVGProps<SVGSVGElement>>;
type CreateIconArguments = {
  m: SizeComponent;
  s: SizeComponent;
  xs: SizeComponent;
  name: string;
};

export function createIcon(props: CreateIconArguments) {
  return iconsCreateIcon({ ...props, l: props.m });
}
