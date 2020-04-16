import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileDocSizeM from './IconFileDoc_size_m';
import IconFileDocSizeS from './IconFileDoc_size_s';

export const IconFileDoc = BaseFileIconHoc({
  m: IconFileDocSizeM,
  s: IconFileDocSizeS,
  name: 'IconFileDoc',
})(IconFile);
