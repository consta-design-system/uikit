import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { FileIconAvi } from '../../FileIconAvi/FileIconAvi';
import { FileIconBmp } from '../../FileIconBmp/FileIconBmp';
import { FileIconCsv } from '../../FileIconCsv/FileIconCsv';
import { FileIconDoc } from '../../FileIconDoc/FileIconDoc';
import { FileIconExe } from '../../FileIconExe/FileIconExe';
import { FileIconGif } from '../../FileIconGif/FileIconGif';
import { FileIconJpg } from '../../FileIconJpg/FileIconJpg';
import { FileIconLoading } from '../../FileIconLoading/FileIconLoading';
import { FileIconMov } from '../../FileIconMov/FileIconMov';
import { FileIconMp3 } from '../../FileIconMp3/FileIconMp3';
import { FileIconMp4 } from '../../FileIconMp4/FileIconMp4';
import { FileIconPdf } from '../../FileIconPdf/FileIconPdf';
import { FileIconPng } from '../../FileIconPng/FileIconPng';
import { FileIconPtt } from '../../FileIconPtt/FileIconPtt';
import { FileIconRar } from '../../FileIconRar/FileIconRar';
import { FileIconRtf } from '../../FileIconRtf/FileIconRtf';
import { FileIconTiff } from '../../FileIconTiff/FileIconTiff';
import { FileIconTxt } from '../../FileIconTxt/FileIconTxt';
import { FileIconUndefined } from '../../FileIconUndefined/FileIconUndefined';
import { FileIconWav } from '../../FileIconWav/FileIconWav';
import { FileIconXls } from '../../FileIconXls/FileIconXls';
import { FileIconZip } from '../../FileIconZip/FileIconZip';

import { IconsItem } from './Item/Icons-Item';

const defaultKnobs = () => ({
  size: select('size', ['s', 'm'], 'm'),
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
  FileIconTxt,
  FileIconTiff,
  FileIconUndefined,
  FileIconWav,
  FileIconXls,
  FileIconZip,
};

storiesOf('FileIcons', module)
  .addDecorator(withKnobs)
  .add('FileIcons', () => (
    <div className="tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full">
      {Object.keys(icons).map((name) => (
        <IconsItem key={name} name={name} icon={icons[name]} {...defaultKnobs()} />
      ))}
    </div>
  ));
