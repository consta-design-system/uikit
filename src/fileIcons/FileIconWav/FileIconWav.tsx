import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconWavSizeM from './FileIconWav_size_m';
import FileIconWavSizeS from './FileIconWav_size_s';

export const FileIconWav = createFileIcon({
  m: FileIconWavSizeM,
  s: FileIconWavSizeS,
  name: 'FileIconWav',
});
