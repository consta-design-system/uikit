import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileMovSizeM from './IconFileMov_size_m';
import IconFileMovSizeS from './IconFileMov_size_s';

export const IconFileMov = BaseFileIconHoc({
  m: IconFileMovSizeM,
  s: IconFileMovSizeS,
  name: 'IconFileMov',
})(IconFile);
