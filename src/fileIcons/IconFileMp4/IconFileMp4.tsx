import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileMp4SizeM from './IconFileMp4_size_m';
import IconFileMp4SizeS from './IconFileMp4_size_s';

export const IconFileMp4 = BaseFileIconHoc({
  m: IconFileMp4SizeM,
  s: IconFileMp4SizeS,
  name: 'IconFileMp4',
})(IconFile);
