import { BaseFileIconHoc } from '../BaseFileIconHoc/BaseFileIconHoc';
import { FileIcon } from '../FileIcon/FileIcon';

import FileIconPdfSizeM from './FileIconPdf_size_m';
import FileIconPdfSizeS from './FileIconPdf_size_s';

export const FileIconPdf = BaseFileIconHoc({
  m: FileIconPdfSizeM,
  s: FileIconPdfSizeS,
  name: 'FileIconPdf',
})(FileIcon);
