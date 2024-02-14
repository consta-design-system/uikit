import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconRarSizeM from './FileIconRar_size_m';
import FileIconRarSizeS from './FileIconRar_size_s';

export const FileIconRar = createFileIcon({
  m: FileIconRarSizeM,
  s: FileIconRarSizeS,
  name: 'FileIconRar',
});
