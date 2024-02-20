import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconCsvSizeM from './FileIconCsv_size_m';
import FileIconCsvSizeS from './FileIconCsv_size_s';

export const FileIconCsv = createFileIcon({
  m: FileIconCsvSizeM,
  s: FileIconCsvSizeS,
  name: 'FileIconCsv',
});
