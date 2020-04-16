import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFilePdfSizeM from './IconFilePdf_size_m';
import IconFilePdfSizeS from './IconFilePdf_size_s';

export const IconFilePdf = BaseFileIconHoc({
  m: IconFilePdfSizeM,
  s: IconFilePdfSizeS,
  name: 'IconFilePdf',
})(IconFile);
