import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconMovSizeM from './FileIconMov_size_m';
import FileIconMovSizeS from './FileIconMov_size_s';

export const FileIconMov = createFileIcon({
  m: FileIconMovSizeM,
  s: FileIconMovSizeS,
  name: 'FileIconMov',
});
