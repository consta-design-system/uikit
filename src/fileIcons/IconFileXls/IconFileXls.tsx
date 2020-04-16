import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFileXlsSizeM from './IconFileXls_size_m';
import IconFileXlsSizeS from './IconFileXls_size_s';

export const IconFileXls = BaseFileIconHoc({
  m: IconFileXlsSizeM,
  s: IconFileXlsSizeS,
  name: 'IconFileXls',
})(IconFile);
