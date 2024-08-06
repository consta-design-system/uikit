import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconSvgSizeM from './FileIconSvg_size_m';
import FileIconSvgSizeS from './FileIconSvg_size_s';

export const FileIconSvg = createFileIcon({
  m: FileIconSvgSizeM,
  s: FileIconSvgSizeS,
  name: 'FileIconSvg',
});
