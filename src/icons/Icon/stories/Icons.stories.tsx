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
import { IconUnsort } from '../../IconUnsort/IconUnsort';
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

const icons = {
  IconAdd,
  IconAlert,
  IconAlignJustify,
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconAttach,
  IconBackward,
  IconBag,
  IconBarrier,
  IconBento,
  IconBold,
  IconBookmarkFilled,
  IconCalendar,
  IconBookmarkStroked,
  IconCamera,
  IconCancel,
  IconChat,
  IconCheck,
  IconClose,
  IconCollapse,
  IconColorFill,
  IconColumns,
  IconColorText,
  IconComment,
  IconConnection,
  IconCopy,
  IconCrown,
  IconDiamond,
  IconDocAdd,
  IconDocBlank,
  IconDocDelete,
  IconDocFilled,
  IconDown,
  IconDrag,
  IconDrop,
  IconEdit,
  IconExpand,
  IconEye,
  IconFavorite,
  IconFilter,
  IconFolders,
  IconForward,
  IconFunnel,
  IconGas,
  IconHamburger,
  IconItalic,
  IconKebab,
  IconLayers,
  IconLeaf,
  IconLink,
  IconList,
  IconLock,
  IconListNumbered,
  IconMail,
  IconMeatball,
  IconPause,
  IconOpenInNew,
  IconPhoto,
  IconPlay,
  IconProcessing,
  IconQuestion,
  IconQuote,
  IconRecord,
  IconRemove,
  IconReply,
  IconRevert,
  IconRing,
  IconRouble,
  IconSearch,
  IconSelect,
  IconSelectOpen,
  IconSettings,
  IconShuffle,
  IconSmile,
  IconSortDown,
  IconSortDownCenter,
  IconSortUp,
  IconSortUpCenter,
  IconStop,
  IconStrikethrough,
  IconTable,
  IconStorage,
  IconTest,
  IconThumbUp,
  IconTop,
  IconTie,
  IconTrash,
  IconType,
  IconUnderline,
  IconUnsort,
  IconUser,
  IconWarning,
  IconWorld,
};

storiesOf('Icons', module)
  .addDecorator(withKnobs)
  .add('Icons', () => (
    <div className="tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full">
      {Object.keys(icons).map((name) => (
        <IconsItem key={name} name={name} icon={icons[name]} {...defaultKnobs()} />
      ))}
    </div>
  ));
