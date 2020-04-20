import React from 'react';
import { IFileIcon } from '../../fileIcons/FileIcon/FileIcon';
import { FileIconAvi } from '../../fileIcons/FileIconAvi/FileIconAvi';
import { FileIconBmp } from '../../fileIcons/FileIconBmp/FileIconBmp';
import { FileIconCsv } from '../../fileIcons/FileIconCsv/FileIconCsv';
import { FileIconDoc } from '../../fileIcons/FileIconDoc/FileIconDoc';
import { FileIconExe } from '../../fileIcons/FileIconExe/FileIconExe';
import { FileIconGif } from '../../fileIcons/FileIconGif/FileIconGif';
import { FileIconJpg } from '../../fileIcons/FileIconJpg/FileIconJpg';
import { FileIconLoading } from '../../fileIcons/FileIconLoading/FileIconLoading';
import { FileIconMov } from '../../fileIcons/FileIconMov/FileIconMov';
import { FileIconMp3 } from '../../fileIcons/FileIconMp3/FileIconMp3';
import { FileIconMp4 } from '../../fileIcons/FileIconMp4/FileIconMp4';
import { FileIconPdf } from '../../fileIcons/FileIconPdf/FileIconPdf';
import { FileIconPng } from '../../fileIcons/FileIconPng/FileIconPng';
import { FileIconPtt } from '../../fileIcons/FileIconPtt/FileIconPtt';
import { FileIconRar } from '../../fileIcons/FileIconRar/FileIconRar';
import { FileIconRtf } from '../../fileIcons/FileIconRtf/FileIconRtf';
import { FileIconTiff } from '../../fileIcons/FileIconTiff/FileIconTiff';
import { FileIconTxt } from '../../fileIcons/FileIconTxt/FileIconTxt';
import { FileIconUndefined } from '../../fileIcons/FileIconUndefined/FileIconUndefined';
import { FileIconWav } from '../../fileIcons/FileIconWav/FileIconWav';
import { FileIconXls } from '../../fileIcons/FileIconXls/FileIconXls';
import { FileIconZip } from '../../fileIcons/FileIconZip/FileIconZip';

export type FileProps = {
  extension?: string;
  loading?: boolean;
};

export type IFile = FileProps & (Omit<IFileIcon, keyof FileProps>);

export function File(props: IFile) {
  const { extension, loading, ...otherProps } = props;

  if (loading) {
    return <FileIconLoading {...otherProps} />;
  }

  const extensionToSvg = {
    bmp: FileIconBmp,
    csv: FileIconCsv,
    avi: FileIconAvi,
    doc: FileIconDoc,
    docx: FileIconDoc,
    gif: FileIconGif,
    exe: FileIconExe,
    jpg: FileIconJpg,
    jpeg: FileIconJpg,
    mp3: FileIconMp3,
    mov: FileIconMov,
    mp4: FileIconMp4,
    pdf: FileIconPdf,
    ptt: FileIconPtt,
    pttx: FileIconPtt,
    png: FileIconPng,
    rar: FileIconRar,
    rtf: FileIconRtf,
    tiff: FileIconTiff,
    txt: FileIconTxt,
    wav: FileIconWav,
    zip: FileIconZip,
    gz: FileIconZip,
    xls: FileIconXls,
    xlsx: FileIconXls,
  };

  function getIconByExtension(extension?: string): React.FC<IFileIcon> {
    if (!extension) {
      return FileIconUndefined;
    }
    return extensionToSvg[extension.toLowerCase()] || FileIconUndefined;
  }

  const Icon = getIconByExtension(extension);

  return <Icon {...otherProps} />;
}
