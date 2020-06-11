import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconRarSizeM from './FileIconRar_size_m';
import FileIconRarSizeS from './FileIconRar_size_s';

export const FileIconRar = BaseFileIconHoc({
  m: FileIconRarSizeM,
  s: FileIconRarSizeS,
  name: 'FileIconRar',
})(FileIcon);
