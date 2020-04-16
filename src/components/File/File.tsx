import React from 'react';
import { IconFilePropSize, IIconFile } from '../../fileIcons/IconFile/IconFile';
import { IconFileBmp } from '../../fileIcons/IconFileBmp/IconFileBmp';
import { IconFileCsv } from '../../fileIcons/IconFileCsv/IconFileCsv';
import { IconFileAvi } from '../../fileIcons/IconFileAvi/IconFileAvi';
import { IconFileDoc } from '../../fileIcons/IconFileDoc/IconFileDoc';
import { IconFileGif } from '../../fileIcons/IconFileGif/IconFileGif';
import { IconFileExe } from '../../fileIcons/IconFileExe/IconFileExe';
import { IconFileJpg } from '../../fileIcons/IconFileJpg/IconFileJpg';
import { IconFileLoading } from '../../fileIcons/IconFileLoading/IconFileLoading';
import { IconFileMp3 } from '../../fileIcons/IconFileMp3/IconFileMp3';
import { IconFileMov } from '../../fileIcons/IconFileMov/IconFileMov';
import { IconFilePdf } from '../../fileIcons/IconFilePdf/IconFilePdf';
import { IconFileMp4 } from '../../fileIcons/IconFileMp4/IconFileMp4';
import { IconFilePtt } from '../../fileIcons/IconFilePtt/IconFilePtt';
import { IconFilePng } from '../../fileIcons/IconFilePng/IconFilePng';
import { IconFileRar } from '../../fileIcons/IconFileRar/IconFileRar';
import { IconFileRtf } from '../../fileIcons/IconFileRtf/IconFileRtf';
import { IconFileTiff } from '../../fileIcons/IconFileTiff/IconFileTiff';
import { IconFileTxt } from '../../fileIcons/IconFileTxt/IconFileTxt';
import { IconFileUndefined } from '../../fileIcons/IconFileUndefined/IconFileUndefined';
import { IconFileWav } from '../../fileIcons/IconFileWav/IconFileWav';
import { IconFileZip } from '../../fileIcons/IconFileZip/IconFileZip';
import { IconFileXls } from '../../fileIcons/IconFileXls/IconFileXls';

export type FileProps = {
  extension?: string;
  loading?: boolean;
};

export type IFile = FileProps & IIconFile & (Omit<IIconFile, keyof FileProps>);

export function File(props: IFile) {
  const { extension, loading, ...otherProps } = props;

  if (loading) {
    return <IconFileLoading {...otherProps} />;
  }

  const extensionToSvg = {
    bmp: IconFileBmp,
    csv: IconFileCsv,
    avi: IconFileAvi,
    doc: IconFileDoc,
    docx: IconFileDoc,
    gif: IconFileGif,
    exe: IconFileExe,
    jpg: IconFileJpg,
    jpeg: IconFileJpg,
    mp3: IconFileMp3,
    mov: IconFileMov,
    mp4: IconFileMp4,
    pdf: IconFilePdf,
    ptt: IconFilePtt,
    pttx: IconFilePtt,
    png: IconFilePng,
    rar: IconFileRar,
    rtf: IconFileRtf,
    tiff: IconFileTiff,
    txt: IconFileTxt,
    wav: IconFileWav,
    zip: IconFileZip,
    gz: IconFileZip,
    xls: IconFileXls,
    xlsx: IconFileXls,
  };

  function getIconByExtension(extension?: string): React.FC<IIconFile> {
    if (!extension) {
      return IconFileUndefined;
    }
    return extensionToSvg[extension.toLowerCase()] || IconFileUndefined;
  }

  const Icon = getIconByExtension(extension);

  return <Icon {...otherProps} />;
}
