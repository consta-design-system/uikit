import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconTiffSizeM from './FileIconTiff_size_m';
import FileIconTiffSizeS from './FileIconTiff_size_s';

export const FileIconTiff = createFileIcon({
  m: FileIconTiffSizeM,
  s: FileIconTiffSizeS,
  name: 'FileIconTiff',
});
