import React from 'react';
import { IFileIcon, FileIconPropSize, cnIconFile } from '../FileIcon/FileIcon';

export type SizeComponent = React.FC<React.SVGProps<SVGSVGElement>>;
export type BaseIconHocArguments = {
  m: SizeComponent;
  s: SizeComponent;
  name: string;
};

export function BaseFileIconHoc({ m, s, name }: BaseIconHocArguments) {
  return function(IconComponent: React.FC<IFileIcon>) {
    return function(props: IFileIcon) {
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
        </IconComponent>
      );
    };
  };
}
