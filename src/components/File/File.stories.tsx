import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import FileAvi from './icons/Avi';
import FileBmp from './icons/Bmp';
import FileCsv from './icons/Csv';
import FileDoc from './icons/Doc';
import FileExe from './icons/Exe';
import FileGif from './icons/Gif';
import FileJpg from './icons/Jpg';
import FileLoading from './icons/Loading';
import FileMov from './icons/Mov';
import FileMp3 from './icons/Mp3';
import FileMp4 from './icons/Mp4';
import FilePdf from './icons/Pdf';
import FilePng from './icons/Png';
import FilePpt from './icons/Ppt';
import FileRar from './icons/Rar';
import FileRtf from './icons/Rtf';
import FileTiff from './icons/Tiff';
import FileTxt from './icons/Txt';
import FileUndefined from './icons/Undefined';
import FileWav from './icons/Wav';
import FileXls from './icons/Xls';
import FileZip from './icons/Zip';

const defaultKnobs = () => ({
  size: select('Size', ['s', 'm'], 'm'),
});

storiesOf('File', module)
  .addDecorator(withKnobs)
  .add('File', () => (
    <div className={'tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full'}>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileLoading {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Loading</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileUndefined {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Undefined</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileAvi {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>AVI</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileBmp {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>BMP</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileCsv {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>CSV</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileDoc {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>DOC</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileExe {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>EXE</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileGif {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>GIF</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileJpg {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>JPG</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileMov {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>MOV</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileMp3 {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>MP3</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileMp4 {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>MP4</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FilePdf {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>PDF</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FilePng {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>PNG</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FilePpt {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>PPT</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileRar {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>RAR</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileRtf {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>RTF</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileTiff {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>TIFF</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileTxt {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>TXT</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileWav {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>WAV</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileXls {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>XLS</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <FileZip {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>ZIP</div>
      </div>
    </div>
  ));
