import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileWavSizeM from './IconFileWav_size_m';
import IconFileWavSizeS from './IconFileWav_size_s';

export const IconFileWav = BaseFileIconHoc({
  m: IconFileWavSizeM,
  s: IconFileWavSizeS,
  name: 'IconFileWav',
})(IconFile);
