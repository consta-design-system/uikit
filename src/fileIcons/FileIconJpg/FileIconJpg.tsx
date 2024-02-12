import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconJpgSizeM from './FileIconJpg_size_m';
import FileIconJpgSizeS from './FileIconJpg_size_s';

export const FileIconJpg = createFileIcon({
  m: FileIconJpgSizeM,
  s: FileIconJpgSizeS,
  name: 'FileIconJpg',
});
