import React, { forwardRef } from 'react';

import { cnIcon, Icon, IconProps } from '../Icon/Icon';

type SizeComponent = React.FC<React.SVGProps<SVGSVGElement>>;
type CreateIconArguments = {
  m: SizeComponent;
  s: SizeComponent;
  xs: SizeComponent;
  name: string;
};

function getSvgBySize(
  size: IconProps['size'] | undefined,
  m: SizeComponent,
  s: SizeComponent,
  xs: SizeComponent,
) {
  switch (size) {
    case 'xs':
      return xs;
    case 's':
      return s;
    case 'm':
      return m;
    default:
      return m;
  }
}

export function createIcon({ m, s, xs, name }: CreateIconArguments) {
  const IconComponent = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
    const Svg = getSvgBySize(props.size, m, s, xs);
    return (
      <Icon
        {...props}
        className={cnIcon(null, [name, props.className])}
        ref={ref}
      >
        <Svg className={cnIcon('Svg')} />
      </Icon>
    );
  });

  return IconComponent;
}
