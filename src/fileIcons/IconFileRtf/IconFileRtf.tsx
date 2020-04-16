import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileRtfSizeM from './IconFileRtf_size_m';
import IconFileRtfSizeS from './IconFileRtf_size_s';

export const IconFileRtf = BaseFileIconHoc({
  m: IconFileRtfSizeM,
  s: IconFileRtfSizeS,
  name: 'IconFileRtf',
})(IconFile);
