import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileJpgSizeM from './IconFileJpg_size_m';
import IconFileJpgSizeS from './IconFileJpg_size_s';

export const IconFileJpg = BaseFileIconHoc({
  m: IconFileJpgSizeM,
  s: IconFileJpgSizeS,
  name: 'IconFileJpg',
})(IconFile);
