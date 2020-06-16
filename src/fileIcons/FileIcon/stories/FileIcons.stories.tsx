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

storiesOf('FileIcons', module)
  .addDecorator(withKnobs)
  .add('FileIcons', () => (
    <div className="tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full">
      <IconsItem name="FileIconAvi" icon={FileIconAvi} {...defaultKnobs()} />
      <IconsItem name="FileIconBmp" icon={FileIconBmp} {...defaultKnobs()} />
      <IconsItem name="FileIconCsv" icon={FileIconCsv} {...defaultKnobs()} />
      <IconsItem name="FileIconDoc" icon={FileIconDoc} {...defaultKnobs()} />
      <IconsItem name="FileIconExe" icon={FileIconExe} {...defaultKnobs()} />
      <IconsItem name="FileIconGif" icon={FileIconGif} {...defaultKnobs()} />
      <IconsItem name="FileIconJpg" icon={FileIconJpg} {...defaultKnobs()} />
      <IconsItem name="FileIconLoading" icon={FileIconLoading} {...defaultKnobs()} />
      <IconsItem name="FileIconMov" icon={FileIconMov} {...defaultKnobs()} />
      <IconsItem name="FileIconMp3" icon={FileIconMp3} {...defaultKnobs()} />
      <IconsItem name="FileIconMp4" icon={FileIconMp4} {...defaultKnobs()} />
      <IconsItem name="FileIconPdf" icon={FileIconPdf} {...defaultKnobs()} />
      <IconsItem name="FileIconPng" icon={FileIconPng} {...defaultKnobs()} />
      <IconsItem name="FileIconPtt" icon={FileIconPtt} {...defaultKnobs()} />
      <IconsItem name="FileIconRar" icon={FileIconRar} {...defaultKnobs()} />
      <IconsItem name="FileIconRtf" icon={FileIconRtf} {...defaultKnobs()} />
      <IconsItem name="FileIconTiff" icon={FileIconTiff} {...defaultKnobs()} />
      <IconsItem name="FileIconTxt" icon={FileIconTxt} {...defaultKnobs()} />
      <IconsItem name="FileIconUndefined" icon={FileIconUndefined} {...defaultKnobs()} />
      <IconsItem name="FileIconWav" icon={FileIconWav} {...defaultKnobs()} />
      <IconsItem name="FileIconXls" icon={FileIconXls} {...defaultKnobs()} />
      <IconsItem name="FileIconZip" icon={FileIconZip} {...defaultKnobs()} />
    </div>
  ));
