import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IconAdd } from '../../IconAdd/IconAdd';
import { IconAlert } from '../../IconAlert/IconAlert';
import { IconAlignCenter } from '../../IconAlignCenter/IconAlignCenter';
import { IconAlignJustify } from '../../IconAlignJustify/IconAlignJustify';
import { IconAlignLeft } from '../../IconAlignLeft/IconAlignLeft';
import { IconAlignRight } from '../../IconAlignRight/IconAlignRight';
import { IconArrowDown } from '../../IconArrowDown/IconArrowDown';
import { IconArrowLeft } from '../../IconArrowLeft/IconArrowLeft';
import { IconArrowRight } from '../../IconArrowRight/IconArrowRight';
import { IconArrowUp } from '../../IconArrowUp/IconArrowUp';
import { IconAttach } from '../../IconAttach/IconAttach';
import { IconBackward } from '../../IconBackward/IconBackward';
import { IconBag } from '../../IconBag/IconBag';
import { IconBarrier } from '../../IconBarrier/IconBarrier';
import { IconBento } from '../../IconBento/IconBento';
import { IconBold } from '../../IconBold/IconBold';
import { IconBookmarkFilled } from '../../IconBookmarkFilled/IconBookmarkFilled';
import { IconBookmarkStroked } from '../../IconBookmarkStroked/IconBookmarkStroked';
import { IconCalendar } from '../../IconCalendar/IconCalendar';
import { IconCamera } from '../../IconCamera/IconCamera';
import { IconCancel } from '../../IconCancel/IconCancel';
import { IconChat } from '../../IconChat/IconChat';
import { IconCheck } from '../../IconCheck/IconCheck';
import { IconClose } from '../../IconClose/IconClose';
import { IconCollapse } from '../../IconCollapse/IconCollapse';
import { IconColorFill } from '../../IconColorFill/IconColorFill';
import { IconColorText } from '../../IconColorText/IconColorText';
import { IconColumns } from '../../IconColumns/IconColumns';
import { IconComment } from '../../IconComment/IconComment';
import { IconConnection } from '../../IconConnection/IconConnection';
import { IconCopy } from '../../IconCopy/IconCopy';
import { IconCrown } from '../../IconCrown/IconCrown';
import { IconDiamond } from '../../IconDiamond/IconDiamond';
import { IconDocAdd } from '../../IconDocAdd/IconDocAdd';
import { IconDocBlank } from '../../IconDocBlank/IconDocBlank';
import { IconDocDelete } from '../../IconDocDelete/IconDocDelete';
import { IconDocFilled } from '../../IconDocFilled/IconDocFilled';
import { IconDown } from '../../IconDown/IconDown';
import { IconDrag } from '../../IconDrag/IconDrag';
import { IconDrop } from '../../IconDrop/IconDrop';
import { IconEdit } from '../../IconEdit/IconEdit';
import { IconExpand } from '../../IconExpand/IconExpand';
import { IconEye } from '../../IconEye/IconEye';
import { IconFavorite } from '../../IconFavorite/IconFavorite';
import { IconFilter } from '../../IconFilter/IconFilter';
import { IconFolders } from '../../IconFolders/IconFolders';
import { IconForward } from '../../IconForward/IconForward';
import { IconFunnel } from '../../IconFunnel/IconFunnel';
import { IconGas } from '../../IconGas/IconGas';
import { IconHamburger } from '../../IconHamburger/IconHamburger';
import { IconItalic } from '../../IconItalic/IconItalic';
import { IconKebab } from '../../IconKebab/IconKebab';
import { IconLayers } from '../../IconLayers/IconLayers';
import { IconLeaf } from '../../IconLeaf/IconLeaf';
import { IconLink } from '../../IconLink/IconLink';
import { IconList } from '../../IconList/IconList';
import { IconListNumbered } from '../../IconListNumbered/IconListNumbered';
import { IconLock } from '../../IconLock/IconLock';
import { IconMail } from '../../IconMail/IconMail';
import { IconMeatball } from '../../IconMeatball/IconMeatball';
import { IconOpenInNew } from '../../IconOpenInNew/IconOpenInNew';
import { IconPause } from '../../IconPause/IconPause';
import { IconPhoto } from '../../IconPhoto/IconPhoto';
import { IconPlay } from '../../IconPlay/IconPlay';
import { IconProcessing } from '../../IconProcessing/IconProcessing';
import { IconQuestion } from '../../IconQuestion/IconQuestion';
import { IconQuote } from '../../IconQuote/IconQuote';
import { IconRecord } from '../../IconRecord/IconRecord';
import { IconRemove } from '../../IconRemove/IconRemove';
import { IconReply } from '../../IconReply/IconReply';
import { IconRevert } from '../../IconRevert/IconRevert';
import { IconRing } from '../../IconRing/IconRing';
import { IconRouble } from '../../IconRouble/IconRouble';
import { IconSearch } from '../../IconSearch/IconSearch';
import { IconSelect } from '../../IconSelect/IconSelect';
import { IconSelectOpen } from '../../IconSelectOpen/IconSelectOpen';
import { IconSettings } from '../../IconSettings/IconSettings';
import { IconShuffle } from '../../IconShuffle/IconShuffle';
import { IconSmile } from '../../IconSmile/IconSmile';
import { IconSortDown } from '../../IconSortDown/IconSortDown';
import { IconSortDownCenter } from '../../IconSortDownCenter/IconSortDownCenter';
import { IconSortUp } from '../../IconSortUp/IconSortUp';
import { IconSortUpCenter } from '../../IconSortUpCenter/IconSortUpCenter';
import { IconStop } from '../../IconStop/IconStop';
import { IconStorage } from '../../IconStorage/IconStorage';
import { IconStrikethrough } from '../../IconStrikethrough/IconStrikethrough';
import { IconTable } from '../../IconTable/IconTable';
import { IconTest } from '../../IconTest/IconTest';
import { IconThumbUp } from '../../IconThumbUp/IconThumbUp';
import { IconTie } from '../../IconTie/IconTie';
import { IconTop } from '../../IconTop/IconTop';
import { IconTrash } from '../../IconTrash/IconTrash';
import { IconType } from '../../IconType/IconType';
import { IconUnderline } from '../../IconUnderline/IconUnderline';
import { IconUser } from '../../IconUser/IconUser';
import { IconWarning } from '../../IconWarning/IconWarning';
import { IconWorld } from '../../IconWorld/IconWorld';

import { IconsItem } from './Item/Icons-Item';

const defaultKnobs = () => ({
  size: select('size', ['xs', 's', 'm'], 'm'),
  view: select(
    'view',
    ['alert', 'brand', 'ghost', 'link', 'primary', 'secondary', 'success', 'warning'],
    'primary',
  ),
});

storiesOf('Icons', module)
  .addDecorator(withKnobs)
  .add('Icons', () => (
    <div className="tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full">
      <IconsItem name="IconAlignJustify" icon={IconAlignJustify} {...defaultKnobs()} />
      <IconsItem name="IconAlert" icon={IconAlert} {...defaultKnobs()} />
      <IconsItem name="IconAlignCenter" icon={IconAlignCenter} {...defaultKnobs()} />
      <IconsItem name="IconAlignLeft" icon={IconAlignLeft} {...defaultKnobs()} />
      <IconsItem name="IconAdd" icon={IconAdd} {...defaultKnobs()} />
      <IconsItem name="IconAlignRight" icon={IconAlignRight} {...defaultKnobs()} />
      <IconsItem name="IconArrowDown" icon={IconArrowDown} {...defaultKnobs()} />
      <IconsItem name="IconArrowLeft" icon={IconArrowLeft} {...defaultKnobs()} />
      <IconsItem name="IconArrowRight" icon={IconArrowRight} {...defaultKnobs()} />
      <IconsItem name="IconArrowUp" icon={IconArrowUp} {...defaultKnobs()} />
      <IconsItem name="IconAttach" icon={IconAttach} {...defaultKnobs()} />
      <IconsItem name="IconBackward" icon={IconBackward} {...defaultKnobs()} />
      <IconsItem name="IconBag" icon={IconBag} {...defaultKnobs()} />
      <IconsItem name="IconBarrier" icon={IconBarrier} {...defaultKnobs()} />
      <IconsItem name="IconBento" icon={IconBento} {...defaultKnobs()} />
      <IconsItem name="IconBold" icon={IconBold} {...defaultKnobs()} />
      <IconsItem name="IconBookmarkFilled" icon={IconBookmarkFilled} {...defaultKnobs()} />
      <IconsItem name="IconBookmarkStroked" icon={IconBookmarkStroked} {...defaultKnobs()} />
      <IconsItem name="IconCalendar" icon={IconCalendar} {...defaultKnobs()} />
      <IconsItem name="IconCamera" icon={IconCamera} {...defaultKnobs()} />
      <IconsItem name="IconCancel" icon={IconCancel} {...defaultKnobs()} />
      <IconsItem name="IconChat" icon={IconChat} {...defaultKnobs()} />
      <IconsItem name="IconCheck" icon={IconCheck} {...defaultKnobs()} />
      <IconsItem name="IconClose" icon={IconClose} {...defaultKnobs()} />
      <IconsItem name="IconCollapse" icon={IconCollapse} {...defaultKnobs()} />
      <IconsItem name="IconColorFill" icon={IconColorFill} {...defaultKnobs()} />
      <IconsItem name="IconColorText" icon={IconColorText} {...defaultKnobs()} />
      <IconsItem name="IconColumns" icon={IconColumns} {...defaultKnobs()} />
      <IconsItem name="IconComment" icon={IconComment} {...defaultKnobs()} />
      <IconsItem name="IconConnection" icon={IconConnection} {...defaultKnobs()} />
      <IconsItem name="IconCopy" icon={IconCopy} {...defaultKnobs()} />
      <IconsItem name="IconCrown" icon={IconCrown} {...defaultKnobs()} />
      <IconsItem name="IconDiamond" icon={IconDiamond} {...defaultKnobs()} />
      <IconsItem name="IconDocAdd" icon={IconDocAdd} {...defaultKnobs()} />
      <IconsItem name="IconDocBlank" icon={IconDocBlank} {...defaultKnobs()} />
      <IconsItem name="IconDocDelete" icon={IconDocDelete} {...defaultKnobs()} />
      <IconsItem name="IconDocFilled" icon={IconDocFilled} {...defaultKnobs()} />
      <IconsItem name="IconDown" icon={IconDown} {...defaultKnobs()} />
      <IconsItem name="IconDrag" icon={IconDrag} {...defaultKnobs()} />
      <IconsItem name="IconDrop" icon={IconDrop} {...defaultKnobs()} />
      <IconsItem name="IconEdit" icon={IconEdit} {...defaultKnobs()} />
      <IconsItem name="IconExpand" icon={IconExpand} {...defaultKnobs()} />
      <IconsItem name="IconEye" icon={IconEye} {...defaultKnobs()} />
      <IconsItem name="IconFavorite" icon={IconFavorite} {...defaultKnobs()} />
      <IconsItem name="IconFilter" icon={IconFilter} {...defaultKnobs()} />
      <IconsItem name="IconFolders" icon={IconFolders} {...defaultKnobs()} />
      <IconsItem name="IconForward" icon={IconForward} {...defaultKnobs()} />
      <IconsItem name="IconFunnel" icon={IconFunnel} {...defaultKnobs()} />
      <IconsItem name="IconGas" icon={IconGas} {...defaultKnobs()} />
      <IconsItem name="IconHamburger" icon={IconHamburger} {...defaultKnobs()} />
      <IconsItem name="IconItalic" icon={IconItalic} {...defaultKnobs()} />
      <IconsItem name="IconKebab" icon={IconKebab} {...defaultKnobs()} />
      <IconsItem name="IconLayers" icon={IconLayers} {...defaultKnobs()} />
      <IconsItem name="IconLeaf" icon={IconLeaf} {...defaultKnobs()} />
      <IconsItem name="IconLink" icon={IconLink} {...defaultKnobs()} />
      <IconsItem name="IconListNumbered" icon={IconListNumbered} {...defaultKnobs()} />
      <IconsItem name="IconList" icon={IconList} {...defaultKnobs()} />
      <IconsItem name="IconLock" icon={IconLock} {...defaultKnobs()} />
      <IconsItem name="IconMail" icon={IconMail} {...defaultKnobs()} />
      <IconsItem name="IconMeatball" icon={IconMeatball} {...defaultKnobs()} />
      <IconsItem name="IconOpenInNew" icon={IconOpenInNew} {...defaultKnobs()} />
      <IconsItem name="IconPause" icon={IconPause} {...defaultKnobs()} />
      <IconsItem name="IconPhoto" icon={IconPhoto} {...defaultKnobs()} />
      <IconsItem name="IconPlay" icon={IconPlay} {...defaultKnobs()} />
      <IconsItem name="IconProcessing" icon={IconProcessing} {...defaultKnobs()} />
      <IconsItem name="IconQuestion" icon={IconQuestion} {...defaultKnobs()} />
      <IconsItem name="IconQuote" icon={IconQuote} {...defaultKnobs()} />
      <IconsItem name="IconRecord" icon={IconRecord} {...defaultKnobs()} />
      <IconsItem name="IconRemove" icon={IconRemove} {...defaultKnobs()} />
      <IconsItem name="IconReply" icon={IconReply} {...defaultKnobs()} />
      <IconsItem name="IconRevert" icon={IconRevert} {...defaultKnobs()} />
      <IconsItem name="IconRing" icon={IconRing} {...defaultKnobs()} />
      <IconsItem name="IconRouble" icon={IconRouble} {...defaultKnobs()} />
      <IconsItem name="IconSearch" icon={IconSearch} {...defaultKnobs()} />
      <IconsItem name="IconSelect" icon={IconSelect} {...defaultKnobs()} />
      <IconsItem name="IconSelectOpen" icon={IconSelectOpen} {...defaultKnobs()} />
      <IconsItem name="IconSettings" icon={IconSettings} {...defaultKnobs()} />
      <IconsItem name="IconShuffle" icon={IconShuffle} {...defaultKnobs()} />
      <IconsItem name="IconSmile" icon={IconSmile} {...defaultKnobs()} />
      <IconsItem name="IconSortDown" icon={IconSortDown} {...defaultKnobs()} />
      <IconsItem name="IconSortDownCenter" icon={IconSortDownCenter} {...defaultKnobs()} />
      <IconsItem name="IconSortUp" icon={IconSortUp} {...defaultKnobs()} />
      <IconsItem name="IconSortUpCenter" icon={IconSortUpCenter} {...defaultKnobs()} />
      <IconsItem name="IconStop" icon={IconStop} {...defaultKnobs()} />
      <IconsItem name="IconStorage" icon={IconStorage} {...defaultKnobs()} />
      <IconsItem name="IconStrikethrough" icon={IconStrikethrough} {...defaultKnobs()} />
      <IconsItem name="IconTest" icon={IconTest} {...defaultKnobs()} />
      <IconsItem name="IconTable" icon={IconTable} {...defaultKnobs()} />
      <IconsItem name="IconThumbUp" icon={IconThumbUp} {...defaultKnobs()} />
      <IconsItem name="IconTie" icon={IconTie} {...defaultKnobs()} />
      <IconsItem name="IconTop" icon={IconTop} {...defaultKnobs()} />
      <IconsItem name="IconTrash" icon={IconTrash} {...defaultKnobs()} />
      <IconsItem name="IconType" icon={IconType} {...defaultKnobs()} />
      <IconsItem name="IconUnderline" icon={IconUnderline} {...defaultKnobs()} />
      <IconsItem name="IconUser" icon={IconUser} {...defaultKnobs()} />
      <IconsItem name="IconWarning" icon={IconWarning} {...defaultKnobs()} />
      <IconsItem name="IconWorld" icon={IconWorld} {...defaultKnobs()} />
    </div>
  ));
