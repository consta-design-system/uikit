import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileLoadingSizeM from './IconFileLoading_size_m';
import IconFileLoadingSizeS from './IconFileLoading_size_s';

export const IconFileLoading = BaseFileIconHoc({
  m: IconFileLoadingSizeM,
  s: IconFileLoadingSizeS,
  name: 'IconFileLoading',
})(IconFile);
