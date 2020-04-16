import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileUndefinedSizeM from './IconFileUndefined_size_m';
import IconFileUndefinedSizeS from './IconFileUndefined_size_s';

export const IconFileUndefined = BaseFileIconHoc({
  m: IconFileUndefinedSizeM,
  s: IconFileUndefinedSizeS,
  name: 'IconFileUndefined',
})(IconFile);
