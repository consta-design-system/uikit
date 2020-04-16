import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileMp3SizeM from './IconFileMp3_size_m';
import IconFileMp3SizeS from './IconFileMp3_size_s';

export const IconFileMp3 = BaseFileIconHoc({
  m: IconFileMp3SizeM,
  s: IconFileMp3SizeS,
  name: 'IconFileMp3',
})(IconFile);
