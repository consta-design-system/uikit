import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconPngSizeM from './FileIconPng_size_m';
import FileIconPngSizeS from './FileIconPng_size_s';

export const FileIconPng = createFileIcon({
  m: FileIconPngSizeM,
  s: FileIconPngSizeS,
  name: 'FileIconPng',
});
