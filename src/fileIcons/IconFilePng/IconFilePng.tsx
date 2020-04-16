import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFilePngSizeM from './IconFilePng_size_m';
import IconFilePngSizeS from './IconFilePng_size_s';

export const IconFilePng = BaseFileIconHoc({
  m: IconFilePngSizeM,
  s: IconFilePngSizeS,
  name: 'IconFilePng',
})(IconFile);
