import { createFileIcon } from '../createFileIcon/createFileIcon';
import FileIconMsgSizeM from './FileIconMsg_size_m';
import FileIconMsgSizeS from './FileIconMsg_size_s';

export const FileIconMsg = createFileIcon({
  m: FileIconMsgSizeM,
  s: FileIconMsgSizeS,
  name: 'FileIconMsg',
});
