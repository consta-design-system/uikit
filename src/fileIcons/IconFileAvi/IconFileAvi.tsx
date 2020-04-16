import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileAviSizeM from './IconFileAvi_size_m';
import IconFileAviSizeS from './IconFileAvi_size_s';

export const IconFileAvi = BaseFileIconHoc({
  m: IconFileAviSizeM,
  s: IconFileAviSizeS,
  name: 'IconFileAvi',
})(IconFile);
