import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconMovSizeM from './FileIconMov_size_m';
import FileIconMovSizeS from './FileIconMov_size_s';

export const FileIconMov = BaseFileIconHoc({
  m: FileIconMovSizeM,
  s: FileIconMovSizeS,
  name: 'FileIconMov',
})(FileIcon);
