import React from 'react';
import { select } from '@storybook/addon-knobs';

import { FileIconAvi } from '../../../FileIconAvi/FileIconAvi';
import { FileIconBmp } from '../../../FileIconBmp/FileIconBmp';
import { FileIconCsv } from '../../../FileIconCsv/FileIconCsv';
import { FileIconDoc } from '../../../FileIconDoc/FileIconDoc';
import { FileIconExe } from '../../../FileIconExe/FileIconExe';
import { FileIconGif } from '../../../FileIconGif/FileIconGif';
import { FileIconJpg } from '../../../FileIconJpg/FileIconJpg';
import { FileIconLoading } from '../../../FileIconLoading/FileIconLoading';
import { FileIconMov } from '../../../FileIconMov/FileIconMov';
import { FileIconMp3 } from '../../../FileIconMp3/FileIconMp3';
import { FileIconMp4 } from '../../../FileIconMp4/FileIconMp4';
import { FileIconPdf } from '../../../FileIconPdf/FileIconPdf';
import { FileIconPng } from '../../../FileIconPng/FileIconPng';
import { FileIconPtt } from '../../../FileIconPtt/FileIconPtt';
import { FileIconRar } from '../../../FileIconRar/FileIconRar';
import { FileIconRtf } from '../../../FileIconRtf/FileIconRtf';
import { FileIconTiff } from '../../../FileIconTiff/FileIconTiff';
import { FileIconTxt } from '../../../FileIconTxt/FileIconTxt';
import { FileIconUndefined } from '../../../FileIconUndefined/FileIconUndefined';
import { FileIconWav } from '../../../FileIconWav/FileIconWav';
import { FileIconXls } from '../../../FileIconXls/FileIconXls';
import { FileIconZip } from '../../../FileIconZip/FileIconZip';
import { fileIconPropSize, fileIconPropSizeDefault } from '../../FileIcon';

import { FileIconsGalleryItem } from './Item/FileIconsGallery-Item';

const defaultKnobs = () => ({
  size: select('size', fileIconPropSize, fileIconPropSizeDefault),
});

const icons = {
  FileIconAvi,
  FileIconBmp,
  FileIconCsv,
  FileIconDoc,
  FileIconExe,
  FileIconGif,
  FileIconJpg,
  FileIconLoading,
  FileIconMov,
  FileIconMp3,
  FileIconMp4,
  FileIconPdf,
  FileIconPng,
  FileIconPtt,
  FileIconRar,
  FileIconRtf,
  FileIconTiff,
  FileIconTxt,
  FileIconUndefined,
  FileIconWav,
  FileIconXls,
  FileIconZip,
} as const;

type Name = keyof typeof icons;

const names = Object.keys(icons) as Name[];

export function FileIconsGallery() {
  return (
    <div className="tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full">
      {names.map((name) => (
        <FileIconsGalleryItem key={name} name={name} icon={icons[name]} {...defaultKnobs()} />
      ))}
    </div>
  );
}
