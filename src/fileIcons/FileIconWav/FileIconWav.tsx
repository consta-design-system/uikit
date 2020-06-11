import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconWavSizeM from './FileIconWav_size_m';
import FileIconWavSizeS from './FileIconWav_size_s';

export const FileIconWav = BaseFileIconHoc({
  m: FileIconWavSizeM,
  s: FileIconWavSizeS,
  name: 'FileIconWav',
})(FileIcon);
