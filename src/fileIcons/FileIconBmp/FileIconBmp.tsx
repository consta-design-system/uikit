import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconBmpSizeM from './FileIconBmp_size_m';
import FileIconBmpSizeS from './FileIconBmp_size_s';

export const FileIconBmp = BaseFileIconHoc({
  m: FileIconBmpSizeM,
  s: FileIconBmpSizeS,
  name: 'FileIconBmp',
})(FileIcon);
