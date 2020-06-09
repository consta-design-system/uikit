import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconJpgSizeM from './FileIconJpg_size_m';
import FileIconJpgSizeS from './FileIconJpg_size_s';

export const FileIconJpg = BaseFileIconHoc({
  m: FileIconJpgSizeM,
  s: FileIconJpgSizeS,
  name: 'FileIconJpg',
})(FileIcon);
