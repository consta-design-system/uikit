import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconRtfSizeM from './FileIconRtf_size_m';
import FileIconRtfSizeS from './FileIconRtf_size_s';

export const FileIconRtf = BaseFileIconHoc({
  m: FileIconRtfSizeM,
  s: FileIconRtfSizeS,
  name: 'FileIconRtf',
})(FileIcon);
