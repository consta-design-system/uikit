import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconDocSizeM from './FileIconDoc_size_m';
import FileIconDocSizeS from './FileIconDoc_size_s';

export const FileIconDoc = BaseFileIconHoc({
  m: FileIconDocSizeM,
  s: FileIconDocSizeS,
  name: 'FileIconDoc',
})(FileIcon);
