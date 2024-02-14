import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconUndefinedSizeM from './FileIconUndefined_size_m';
import FileIconUndefinedSizeS from './FileIconUndefined_size_s';

export const FileIconUndefined = createFileIcon({
  m: FileIconUndefinedSizeM,
  s: FileIconUndefinedSizeS,
  name: 'FileIconUndefined',
});
