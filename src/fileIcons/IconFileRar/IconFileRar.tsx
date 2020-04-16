import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileRarSizeM from './IconFileRar_size_m';
import IconFileRarSizeS from './IconFileRar_size_s';

export const IconFileRar = BaseFileIconHoc({
  m: IconFileRarSizeM,
  s: IconFileRarSizeS,
  name: 'IconFileRar',
})(IconFile);
