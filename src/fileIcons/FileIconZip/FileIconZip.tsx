import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconZipSizeM from './FileIconZip_size_m';
import FileIconZipSizeS from './FileIconZip_size_s';

export const FileIconZip = BaseFileIconHoc({
  m: FileIconZipSizeM,
  s: FileIconZipSizeS,
  name: 'FileIconZip',
})(FileIcon);
