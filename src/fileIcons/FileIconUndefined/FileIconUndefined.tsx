import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconUndefinedSizeM from './FileIconUndefined_size_m';
import FileIconUndefinedSizeS from './FileIconUndefined_size_s';

export const FileIconUndefined = BaseFileIconHoc({
  m: FileIconUndefinedSizeM,
  s: FileIconUndefinedSizeS,
  name: 'FileIconUndefined',
})(FileIcon);
