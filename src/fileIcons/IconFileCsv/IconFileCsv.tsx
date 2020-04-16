import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileCsvSizeM from './IconFileCsv_size_m';
import IconFileCsvSizeS from './IconFileCsv_size_s';

export const IconFileCsv = BaseFileIconHoc({
  m: IconFileCsvSizeM,
  s: IconFileCsvSizeS,
  name: 'IconFileCsv',
})(IconFile);
