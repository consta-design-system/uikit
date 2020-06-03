import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconGifSizeM from './FileIconGif_size_m';
import FileIconGifSizeS from './FileIconGif_size_s';

export const FileIconGif = BaseFileIconHoc({
  m: FileIconGifSizeM,
  s: FileIconGifSizeS,
  name: 'FileIconGif',
})(FileIcon);
