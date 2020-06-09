import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconPttSizeM from './FileIconPtt_size_m';
import FileIconPttSizeS from './FileIconPtt_size_s';

export const FileIconPtt = BaseFileIconHoc({
  m: FileIconPttSizeM,
  s: FileIconPttSizeS,
  name: 'FileIconPtt',
})(FileIcon);
