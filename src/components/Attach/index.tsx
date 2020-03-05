import React, { lazy, Suspense } from 'react';
import bem from '../../utils/bem';

import './styles.css';

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
  status: 'loaded' | 'loading' | 'error' | 'content';
};

const Attach: React.FC<CommonProps> = props => {
  const { status } = props;

  const FileIcon = lazy(() => import('../File/icons/Avi'));

  return (
    <a className={b({ status })}>
      <span className={b('icon')}>
        <Suspense fallback={null}>
          <FileIcon size="s" />
        </Suspense>
      </span>
      <span className={b('content')}></span>
    </a>
  );
};

export default Attach;
