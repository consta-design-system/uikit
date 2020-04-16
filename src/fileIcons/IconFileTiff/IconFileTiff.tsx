import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileTiffSizeM from './IconFileTiff_size_m';
import IconFileTiffSizeS from './IconFileTiff_size_s';

export const IconFileTiff = BaseFileIconHoc({
  m: IconFileTiffSizeM,
  s: IconFileTiffSizeS,
  name: 'IconFileTiff',
})(IconFile);
