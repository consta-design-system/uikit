import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconMp3SizeM from './FileIconMp3_size_m';
import FileIconMp3SizeS from './FileIconMp3_size_s';

export const FileIconMp3 = BaseFileIconHoc({
  m: FileIconMp3SizeM,
  s: FileIconMp3SizeS,
  name: 'FileIconMp3',
})(FileIcon);
