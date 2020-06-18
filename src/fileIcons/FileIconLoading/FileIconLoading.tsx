import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconLoadingSizeM from './FileIconLoading_size_m';
import FileIconLoadingSizeS from './FileIconLoading_size_s';

export const FileIconLoading = BaseFileIconHoc({
  m: FileIconLoadingSizeM,
  s: FileIconLoadingSizeS,
  name: 'FileIconLoading',
})(FileIcon);
