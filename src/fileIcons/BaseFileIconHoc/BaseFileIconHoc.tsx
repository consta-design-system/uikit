import React from 'react';

import { cnIconFile, FileIconProps, FileIconPropSize } from '../FileIcon/FileIcon';

export type SizeComponent = React.FC<React.SVGProps<SVGSVGElement>>;
export type BaseIconHocArguments = {
  m: SizeComponent;
  s: SizeComponent;
  name: string;
};

export function BaseFileIconHoc({ m, s, name }: BaseIconHocArguments) {
  return function(IconComponent: React.FC<FileIconProps>) {
    return function(props: FileIconProps) {
      function getSvgBySize(size: FileIconPropSize | undefined) {
        switch (size) {
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
        <IconComponent {...props} className={cnIconFile(null, [name, props.className])}>
          <Svg className={cnIconFile('Svg')} />
          {props.children}
        </IconComponent>
      );
    };
  };
}
