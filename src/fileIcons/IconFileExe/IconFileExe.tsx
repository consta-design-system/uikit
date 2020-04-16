import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileExeSizeM from './IconFileExe_size_m';
import IconFileExeSizeS from './IconFileExe_size_s';

export const IconFileExe = BaseFileIconHoc({
  m: IconFileExeSizeM,
  s: IconFileExeSizeS,
  name: 'IconFileExe',
})(IconFile);
