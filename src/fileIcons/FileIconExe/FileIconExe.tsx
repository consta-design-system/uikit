import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconExeSizeM from './FileIconExe_size_m';
import FileIconExeSizeS from './FileIconExe_size_s';

export const FileIconExe = BaseFileIconHoc({
  m: FileIconExeSizeM,
  s: FileIconExeSizeS,
  name: 'FileIconExe',
})(FileIcon);
