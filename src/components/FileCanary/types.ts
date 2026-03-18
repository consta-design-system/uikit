import { IconComponent } from '@consta/icons/Icon';

import { AsTags } from '##/utils/types/AsTags';
import { PropsWithAsAttributes } from '##/utils/types/PropsWithAsAttributes';

export const filePropSize = ['s', 'm'] as const;
export type FilePropSize = typeof filePropSize[number];
export const filePropSizeDefault: FilePropSize = filePropSize[1];

export type FileTypeConfig = {
  color: string;
  icon: IconComponent;
};

export type FileConfig = Record<string, FileTypeConfig>;

export type FileBaseProps<As extends AsTags = 'div'> = PropsWithAsAttributes<
  {
    size: FilePropSize;
    icon: IconComponent;
    extension: string;
    color: string;
    className?: string;
  },
  As
>;

export type FileBaseComponent = <As extends AsTags = 'div'>(
  props: FileBaseProps<As>,
) => React.ReactElement;

export type FileProps<As extends AsTags = 'div'> = PropsWithAsAttributes<
  {
    size?: FilePropSize;
    extension: string;
    className?: string;
  },
  As
>;

export type FileComponent = <As extends AsTags = 'div'>(
  props: FileProps<As>,
) => React.ReactElement;
