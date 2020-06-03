import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconAviSizeM from './FileIconAvi_size_m';
import FileIconAviSizeS from './FileIconAvi_size_s';

export const FileIconAvi = BaseFileIconHoc({
  m: FileIconAviSizeM,
  s: FileIconAviSizeS,
  name: 'FileIconAvi',
})(FileIcon);
