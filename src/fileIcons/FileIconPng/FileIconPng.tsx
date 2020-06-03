import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconPngSizeM from './FileIconPng_size_m';
import FileIconPngSizeS from './FileIconPng_size_s';

export const FileIconPng = BaseFileIconHoc({
  m: FileIconPngSizeM,
  s: FileIconPngSizeS,
  name: 'FileIconPng',
})(FileIcon);
