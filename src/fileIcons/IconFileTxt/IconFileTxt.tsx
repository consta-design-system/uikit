import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileTxtSizeM from './IconFileTxt_size_m';
import IconFileTxtSizeS from './IconFileTxt_size_s';

export const IconFileTxt = BaseFileIconHoc({
  m: IconFileTxtSizeM,
  s: IconFileTxtSizeS,
  name: 'IconFileTxt',
})(IconFile);
