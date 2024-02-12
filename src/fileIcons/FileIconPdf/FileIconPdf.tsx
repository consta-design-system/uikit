import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconPdfSizeM from './FileIconPdf_size_m';
import FileIconPdfSizeS from './FileIconPdf_size_s';

export const FileIconPdf = createFileIcon({
  m: FileIconPdfSizeM,
  s: FileIconPdfSizeS,
  name: 'FileIconPdf',
});
