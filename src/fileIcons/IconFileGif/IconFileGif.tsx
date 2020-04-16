import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileGifSizeM from './IconFileGif_size_m';
import IconFileGifSizeS from './IconFileGif_size_s';

export const IconFileGif = BaseFileIconHoc({
  m: IconFileGifSizeM,
  s: IconFileGifSizeS,
  name: 'IconFileGif',
})(IconFile);
