import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconCsvSizeM from './FileIconCsv_size_m';
import FileIconCsvSizeS from './FileIconCsv_size_s';

export const FileIconCsv = BaseFileIconHoc({
  m: FileIconCsvSizeM,
  s: FileIconCsvSizeS,
  name: 'FileIconCsv',
})(FileIcon);
