import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconTxtSizeM from './FileIconTxt_size_m';
import FileIconTxtSizeS from './FileIconTxt_size_s';

export const FileIconTxt = BaseFileIconHoc({
  m: FileIconTxtSizeM,
  s: FileIconTxtSizeS,
  name: 'FileIconTxt',
})(FileIcon);
