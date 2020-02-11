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
    <div>
      <FileAvi className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileBmp className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileCsv className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileDoc className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileExe className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileGif className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileJpg className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileLoading className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileMov className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileMp3 className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileMp4 className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FilePdf className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FilePng className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FilePpt className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileRar className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileRtf className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileTiff className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileTxt className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileUndefined className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileWav className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileXls className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
      <FileZip className={'decorator decorator_indent-r_s'} {...defaultKnobs()} />
    </div>
  ));
