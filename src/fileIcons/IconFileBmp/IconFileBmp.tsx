import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileBmpSizeM from './IconFileBmp_size_m';
import IconFileBmpSizeS from './IconFileBmp_size_s';

export const IconFileBmp = BaseFileIconHoc({
  m: IconFileBmpSizeM,
  s: IconFileBmpSizeS,
  name: 'IconFileBmp',
})(IconFile);
