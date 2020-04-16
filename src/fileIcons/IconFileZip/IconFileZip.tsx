import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileZipSizeM from './IconFileZip_size_m';
import IconFileZipSizeS from './IconFileZip_size_s';

export const IconFileZip = BaseFileIconHoc({
  m: IconFileZipSizeM,
  s: IconFileZipSizeS,
  name: 'IconFileZip',
})(IconFile);
