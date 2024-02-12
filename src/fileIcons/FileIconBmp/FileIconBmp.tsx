import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconBmpSizeM from './FileIconBmp_size_m';
import FileIconBmpSizeS from './FileIconBmp_size_s';

export const FileIconBmp = createFileIcon({
  m: FileIconBmpSizeM,
  s: FileIconBmpSizeS,
  name: 'FileIconBmp',
});
