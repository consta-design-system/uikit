import React from 'react';

import { cnIcon, IconProps, IconPropSize } from '../Icon/Icon';

export type SizeComponent = React.FC<React.SVGProps<SVGSVGElement>>;
export type BaseIconHocArguments = {
  m: SizeComponent;
  s: SizeComponent;
  xs: SizeComponent;
  name: string;
};

export function BaseIconHoc({ m, s, xs, name }: BaseIconHocArguments) {
  return function(IconComponent: React.FC<IconProps>) {
    return function(props: IconProps) {
      function getSvgBySize(size: IconPropSize | undefined) {
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

      const Svg: SizeComponent = getSvgBySize(props.size);

      return (
        <IconComponent {...props} className={cnIcon(null, [name, props.className])}>
          <Svg className={cnIcon('Svg')} />
        </IconComponent>
      );
    };
  };
}
