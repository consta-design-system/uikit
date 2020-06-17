import { createFileIcon } from '../createFileIcon/createFileIcon';

import FileIconPttSizeM from './FileIconPtt_size_m';
import FileIconPttSizeS from './FileIconPtt_size_s';

export const FileIconPtt = createFileIcon({
  m: FileIconPttSizeM,
  s: FileIconPttSizeS,
  name: 'FileIconPtt',
});
