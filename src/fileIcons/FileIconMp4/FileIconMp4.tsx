import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconMp4SizeM from './FileIconMp4_size_m';
import FileIconMp4SizeS from './FileIconMp4_size_s';

export const FileIconMp4 = BaseFileIconHoc({
  m: FileIconMp4SizeM,
  s: FileIconMp4SizeS,
  name: 'FileIconMp4',
})(FileIcon);
