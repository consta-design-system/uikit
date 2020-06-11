import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconTiffSizeM from './FileIconTiff_size_m';
import FileIconTiffSizeS from './FileIconTiff_size_s';

export const FileIconTiff = BaseFileIconHoc({
  m: FileIconTiffSizeM,
  s: FileIconTiffSizeS,
  name: 'FileIconTiff',
})(FileIcon);
