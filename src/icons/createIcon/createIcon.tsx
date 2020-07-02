import React from 'react';

import { cnIcon, Icon, IconProps } from '../Icon/Icon';

type SizeComponent = React.FC<React.SVGProps<SVGSVGElement>>;
type CreateIconArguments = {
  m: SizeComponent;
  s: SizeComponent;
  xs: SizeComponent;
  name: string;
};

export function createIcon({ m, s, xs, name }: CreateIconArguments) {
  const IconComponent: React.FC<IconProps> = (props) => {
    function getSvgBySize(size: IconProps['size'] | undefined) {
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
      <Icon {...props} className={cnIcon(null, [name, props.className])}>
        <Svg className={cnIcon('Svg')} />
      </Icon>
    );
  };

  return IconComponent;
}
