import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { IconFile } from '../IconFile/IconFile';
import IconFilePttSizeM from './IconFilePtt_size_m';
import IconFilePttSizeS from './IconFilePtt_size_s';

export const IconFilePtt = BaseFileIconHoc({
  m: IconFilePttSizeM,
  s: IconFilePttSizeS,
  name: 'IconFilePtt',
})(IconFile);
