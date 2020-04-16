import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { IconFileAvi } from '../../IconFileAvi/IconFileAvi';
import { IconFileBmp } from '../../IconFileBmp/IconFileBmp';
import { IconFileCsv } from '../../IconFileCsv/IconFileCsv';
import { IconFileDoc } from '../../IconFileDoc/IconFileDoc';
import { IconFileExe } from '../../IconFileExe/IconFileExe';
import { IconFileGif } from '../../IconFileGif/IconFileGif';
import { IconFileJpg } from '../../IconFileJpg/IconFileJpg';
import { IconFileLoading } from '../../IconFileLoading/IconFileLoading';
import { IconFileMov } from '../../IconFileMov/IconFileMov';
import { IconFileMp3 } from '../../IconFileMp3/IconFileMp3';
import { IconFileMp4 } from '../../IconFileMp4/IconFileMp4';
import { IconFilePdf } from '../../IconFilePdf/IconFilePdf';
import { IconFilePng } from '../../IconFilePng/IconFilePng';
import { IconFilePtt } from '../../IconFilePtt/IconFilePtt';
import { IconFileRar } from '../../IconFileRar/IconFileRar';
import { IconFileRtf } from '../../IconFileRtf/IconFileRtf';
import { IconFileTiff } from '../../IconFileTiff/IconFileTiff';
import { IconFileTxt } from '../../IconFileTxt/IconFileTxt';
import { IconFileUndefined } from '../../IconFileUndefined/IconFileUndefined';
import { IconFileWav } from '../../IconFileWav/IconFileWav';
import { IconFileXls } from '../../IconFileXls/IconFileXls';
import { IconFileZip } from '../../IconFileZip/IconFileZip';

import { IconsItem } from './Item/Icons-Item';

const defaultKnobs = () => ({
  size: select('size', ['s', 'm'], 'm'),
});

storiesOf('FileIcons', module)
  .addDecorator(withKnobs)
  .add('FileIcons', () => (
    <div className={'tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full'}>
    <IconsItem name="IconFileAvi" icon={IconFileAvi} {...defaultKnobs()} />
<IconsItem name="IconFileBmp" icon={IconFileBmp} {...defaultKnobs()} />
<IconsItem name="IconFileCsv" icon={IconFileCsv} {...defaultKnobs()} />
<IconsItem name="IconFileDoc" icon={IconFileDoc} {...defaultKnobs()} />
<IconsItem name="IconFileExe" icon={IconFileExe} {...defaultKnobs()} />
<IconsItem name="IconFileGif" icon={IconFileGif} {...defaultKnobs()} />
<IconsItem name="IconFileJpg" icon={IconFileJpg} {...defaultKnobs()} />
<IconsItem name="IconFileLoading" icon={IconFileLoading} {...defaultKnobs()} />
<IconsItem name="IconFileMov" icon={IconFileMov} {...defaultKnobs()} />
<IconsItem name="IconFileMp3" icon={IconFileMp3} {...defaultKnobs()} />
<IconsItem name="IconFileMp4" icon={IconFileMp4} {...defaultKnobs()} />
<IconsItem name="IconFilePdf" icon={IconFilePdf} {...defaultKnobs()} />
<IconsItem name="IconFilePng" icon={IconFilePng} {...defaultKnobs()} />
<IconsItem name="IconFilePtt" icon={IconFilePtt} {...defaultKnobs()} />
<IconsItem name="IconFileRar" icon={IconFileRar} {...defaultKnobs()} />
<IconsItem name="IconFileRtf" icon={IconFileRtf} {...defaultKnobs()} />
<IconsItem name="IconFileTiff" icon={IconFileTiff} {...defaultKnobs()} />
<IconsItem name="IconFileTxt" icon={IconFileTxt} {...defaultKnobs()} />
<IconsItem name="IconFileUndefined" icon={IconFileUndefined} {...defaultKnobs()} />
<IconsItem name="IconFileWav" icon={IconFileWav} {...defaultKnobs()} />
<IconsItem name="IconFileXls" icon={IconFileXls} {...defaultKnobs()} />
<IconsItem name="IconFileZip" icon={IconFileZip} {...defaultKnobs()} />

    </div>
  ));

