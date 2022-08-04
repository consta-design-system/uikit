import React from 'react';

import { cnIconFile, FileIcon, FileIconProps } from '../FileIcon/FileIcon';

type SizeComponent = React.FC<React.SVGProps<SVGSVGElement>>;
type CreateFileIconArguments = {
  m: SizeComponent;
  s: SizeComponent;
  name: string;
};

export function createFileIcon({ m, s, name }: CreateFileIconArguments) {
  const FileIconComponent: React.FC<FileIconProps> = (props) => {
    function getSvgBySize(size: FileIconProps['size'] | undefined) {
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
      <FileIcon
        {...props}
        className={cnIconFile(null, [name, props.className])}
      >
        <Svg className={cnIconFile('Svg')} />
        {props.children}
      </FileIcon>
    );
  };

  return FileIconComponent;
}
