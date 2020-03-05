import React, { lazy, Suspense } from 'react';
import bem from '../../utils/bem';

import './styles.css';

import FileLoading from '../File/icons/Loading';
import { getFileSizeStr, getFileIconComponentName } from './utils';

// import FileAvi from '../File/icons/Avi';
// import FileBmp from '../File/icons/Bmp';
// import FileCsv from '../File/icons/Csv';
// import FileDoc from '../File/icons/Doc';
// import FileExe from '../File/icons/Exe';
// import FileGif from '../File/icons/Gif';
// import FileJpg from '../File/icons/Jpg';
// import FileLoading from '../File/icons/Loading';
// import FileMov from '../File/icons/Mov';
// import FileMp3 from '../File/icons/Mp3';
// import FileMp4 from '../File/icons/Mp4';
// import FilePdf from '../File/icons/Pdf';
// import FilePng from '../File/icons/Png';
// import FilePpt from '../File/icons/Ppt';
// import FileRar from '../File/icons/Rar';
// import FileRtf from '../File/icons/Rtf';
// import FileTiff from '../File/icons/Tiff';
// import FileTxt from '../File/icons/Txt';
// import FileUndefined from '../File/icons/Undefined';
// import FileWav from '../File/icons/Wav';
// import FileXls from '../File/icons/Xls';
// import FileZip from '../File/icons/Zip';

const b = bem('attach');

type CommonProps = {
  fileName: string;
};

type LoadedProps = {
  status: 'loaded' | string;
  fileSize: number;
  timestamp: number;
  onDelete?: () => void;
} & CommonProps;

type LoadingProps = {
  status: 'loading' | string;
  progress: number;
  onCancel?: () => void;
} & CommonProps;

type ErrorProps = {
  status: 'error' | string;
  message: string;
  onCancel?: () => void;
} & CommonProps;

type ContentProps = {
  status: 'content' | string;
  fileSize: number;
  timestamp: number;
  href: string;
} & CommonProps;

type AttachType = LoadedProps | LoadingProps | ErrorProps | ContentProps;

const Attach: React.FC<AttachType> = props => {
  const { status, fileName, timestamp, fileSize } = props;

  // console.log(`../File/icons/${getFileIconComponentName(fileName)}`);
  const name = 'Undefined';
  const FileIcon = lazy(() => import(`../File/icons/${name}`));

  console.log(`../File/icons/${getFileIconComponentName(fileName)}`);
  return (
    <div className={b({ status })}>
      <div className={b('icon')}>
        <Suspense fallback={<FileLoading size="s" />}>
          <FileIcon size="s" />
        </Suspense>
      </div>
      <div className={b('content')}>
        <div className={b('name')}>{fileName}</div>
        <div className={b('information')}>
          <div className={b('information-item')}>{getFileSizeStr(fileSize)}</div>
          <div className={b('information-item')}>{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default Attach;
