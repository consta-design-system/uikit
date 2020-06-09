import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconXlsSizeM from './FileIconXls_size_m';
import FileIconXlsSizeS from './FileIconXls_size_s';

export const FileIconXls = BaseFileIconHoc({
  m: FileIconXlsSizeM,
  s: FileIconXlsSizeS,
  name: 'FileIconXls',
})(FileIcon);
