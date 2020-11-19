import React from 'react';
import { select } from '@storybook/addon-knobs';

import { IconAdd } from '../../IconAdd/IconAdd';
import { IconAddToComparison } from '../../IconAddToComparison/IconAddToComparison';
import { IconAlert } from '../../IconAlert/IconAlert';
import { IconAlignBlocksLeft } from '../../IconAlignBlocksLeft/IconAlignBlocksLeft';
import { IconAlignBlocksRight } from '../../IconAlignBlocksRight/IconAlignBlocksRight';
import { IconAlignCenter } from '../../IconAlignCenter/IconAlignCenter';
import { IconAlignJustify } from '../../IconAlignJustify/IconAlignJustify';
import { IconAlignLeft } from '../../IconAlignLeft/IconAlignLeft';
import { IconAlignRight } from '../../IconAlignRight/IconAlignRight';
import { IconAllDone } from '../../IconAllDone/IconAllDone';
import { IconArrowDown } from '../../IconArrowDown/IconArrowDown';
import { IconArrowLeft } from '../../IconArrowLeft/IconArrowLeft';
import { IconArrowRight } from '../../IconArrowRight/IconArrowRight';
import { IconArrowUp } from '../../IconArrowUp/IconArrowUp';
import { IconArtBrush } from '../../IconArtBrush/IconArtBrush';
import { IconAttach } from '../../IconAttach/IconAttach';
import { IconBackward } from '../../IconBackward/IconBackward';
import { IconBag } from '../../IconBag/IconBag';
import { IconBarrier } from '../../IconBarrier/IconBarrier';
import { IconBento } from '../../IconBento/IconBento';
import { IconBold } from '../../IconBold/IconBold';
import { IconBookmarkFilled } from '../../IconBookmarkFilled/IconBookmarkFilled';
import { IconBookmarkStroked } from '../../IconBookmarkStroked/IconBookmarkStroked';
import { IconCalculator } from '../../IconCalculator/IconCalculator';
import { IconCalendar } from '../../IconCalendar/IconCalendar';
import { IconCamera } from '../../IconCamera/IconCamera';
import { IconCancel } from '../../IconCancel/IconCancel';
import { IconCards } from '../../IconCards/IconCards';
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
import { IconCursorMouse } from '../../IconCursorMouse/IconCursorMouse';
import { IconDiamond } from '../../IconDiamond/IconDiamond';
import { IconDinosaur } from '../../IconDinosaur/IconDinosaur';
import { IconDisconnection } from '../../IconDisconnection/IconDisconnection';
import { IconDocAdd } from '../../IconDocAdd/IconDocAdd';
import { IconDocBlank } from '../../IconDocBlank/IconDocBlank';
import { IconDocDelete } from '../../IconDocDelete/IconDocDelete';
import { IconDocExport } from '../../IconDocExport/IconDocExport';
import { IconDocFilled } from '../../IconDocFilled/IconDocFilled';
import { IconDown } from '../../IconDown/IconDown';
import { IconDownload } from '../../IconDownload/IconDownload';
import { IconDrag } from '../../IconDrag/IconDrag';
import { IconDrillingRig } from '../../IconDrillingRig/IconDrillingRig';
import { IconDrop } from '../../IconDrop/IconDrop';
import { IconEdit } from '../../IconEdit/IconEdit';
import { IconExit } from '../../IconExit/IconExit';
import { IconExpand } from '../../IconExpand/IconExpand';
import { IconEye } from '../../IconEye/IconEye';
import { IconEyeClose } from '../../IconEyeClose/IconEyeClose';
import { IconFavorite } from '../../IconFavorite/IconFavorite';
import { IconFilter } from '../../IconFilter/IconFilter';
import { IconFitToDefault } from '../../IconFitToDefault/IconFitToDefault';
import { IconFlagFilled } from '../../IconFlagFilled/IconFlagFilled';
import { IconFlagStroked } from '../../IconFlagStroked/IconFlagStroked';
import { IconFolders } from '../../IconFolders/IconFolders';
import { IconForward } from '../../IconForward/IconForward';
import { IconFunnel } from '../../IconFunnel/IconFunnel';
import { IconGas } from '../../IconGas/IconGas';
import { IconGeo } from '../../IconGeo/IconGeo';
import { IconGrouping } from '../../IconGrouping/IconGrouping';
import { IconHamburger } from '../../IconHamburger/IconHamburger';
import { IconHand } from '../../IconHand/IconHand';
import { IconHealth } from '../../IconHealth/IconHealth';
import { IconInComparison } from '../../IconInComparison/IconInComparison';
import { IconIntroduction } from '../../IconIntroduction/IconIntroduction';
import { IconIpad } from '../../IconIpad/IconIpad';
import { IconItalic } from '../../IconItalic/IconItalic';
import { IconKebab } from '../../IconKebab/IconKebab';
import { IconLaptop } from '../../IconLaptop/IconLaptop';
import { IconLayers } from '../../IconLayers/IconLayers';
import { IconLeaf } from '../../IconLeaf/IconLeaf';
import { IconLink } from '../../IconLink/IconLink';
import { IconList } from '../../IconList/IconList';
import { IconListNumbered } from '../../IconListNumbered/IconListNumbered';
import { IconLock } from '../../IconLock/IconLock';
import { IconMail } from '../../IconMail/IconMail';
import { IconMap } from '../../IconMap/IconMap';
import { IconMaxHeight } from '../../IconMaxHeight/IconMaxHeight';
import { IconMaxWidth } from '../../IconMaxWidth/IconMaxWidth';
import { IconMBU } from '../../IconMBU/IconMBU';
import { IconMeatball } from '../../IconMeatball/IconMeatball';
import { IconMGRP } from '../../IconMGRP/IconMGRP';
import { IconMic } from '../../IconMic/IconMic';
import { IconMLSP } from '../../IconMLSP/IconMLSP';
import { IconMMP } from '../../IconMMP/IconMMP';
import { IconMolecules } from '../../IconMolecules/IconMolecules';
import { IconMoon } from '../../IconMoon/IconMoon';
import { IconNodeEnd } from '../../IconNodeEnd/IconNodeEnd';
import { IconNodes } from '../../IconNodes/IconNodes';
import { IconNodeStart } from '../../IconNodeStart/IconNodeStart';
import { IconNodeStep } from '../../IconNodeStep/IconNodeStep';
import { IconOpenInNew } from '../../IconOpenInNew/IconOpenInNew';
import { IconPanelBottom } from '../../IconPanelBottom/IconPanelBottom';
import { IconPanelLeft } from '../../IconPanelLeft/IconPanelLeft';
import { IconPanelRight } from '../../IconPanelRight/IconPanelRight';
import { IconPanelTop } from '../../IconPanelTop/IconPanelTop';
import { IconPaste } from '../../IconPaste/IconPaste';
import { IconPause } from '../../IconPause/IconPause';
import { IconPhone } from '../../IconPhone/IconPhone';
import { IconPhoto } from '../../IconPhoto/IconPhoto';
import { IconPlay } from '../../IconPlay/IconPlay';
import { IconPressure } from '../../IconPressure/IconPressure';
import { IconProcessing } from '../../IconProcessing/IconProcessing';
import { IconQuestion } from '../../IconQuestion/IconQuestion';
import { IconQuote } from '../../IconQuote/IconQuote';
import { IconRecord } from '../../IconRecord/IconRecord';
import { IconRemove } from '../../IconRemove/IconRemove';
import { IconRemoveFromComparison } from '../../IconRemoveFromComparison/IconRemoveFromComparison';
import { IconReply } from '../../IconReply/IconReply';
import { IconResize } from '../../IconResize/IconResize';
import { IconRestart } from '../../IconRestart/IconRestart';
import { IconRevert } from '../../IconRevert/IconRevert';
import { IconRing } from '../../IconRing/IconRing';
import { IconRouble } from '../../IconRouble/IconRouble';
import { IconRuler } from '../../IconRuler/IconRuler';
import { IconRUO } from '../../IconRUO/IconRUO';
import { IconRUS } from '../../IconRUS/IconRUS';
import { IconScreen } from '../../IconScreen/IconScreen';
import { IconSearch } from '../../IconSearch/IconSearch';
import { IconSelect } from '../../IconSelect/IconSelect';
import { IconSelectOpen } from '../../IconSelectOpen/IconSelectOpen';
import { IconSettings } from '../../IconSettings/IconSettings';
import { IconShape } from '../../IconShape/IconShape';
import { IconShuffle } from '../../IconShuffle/IconShuffle';
import { IconSmile } from '../../IconSmile/IconSmile';
import { IconSortDown } from '../../IconSortDown/IconSortDown';
import { IconSortDownCenter } from '../../IconSortDownCenter/IconSortDownCenter';
import { IconSortUp } from '../../IconSortUp/IconSortUp';
import { IconSortUpCenter } from '../../IconSortUpCenter/IconSortUpCenter';
import { IconStop } from '../../IconStop/IconStop';
import { IconStorage } from '../../IconStorage/IconStorage';
import { IconStrikethrough } from '../../IconStrikethrough/IconStrikethrough';
import { IconSun } from '../../IconSun/IconSun';
import { IconTable } from '../../IconTable/IconTable';
import { IconTarget } from '../../IconTarget/IconTarget';
import { IconTeam } from '../../IconTeam/IconTeam';
import { IconTest } from '../../IconTest/IconTest';
import { IconThumbUp } from '../../IconThumbUp/IconThumbUp';
import { IconTie } from '../../IconTie/IconTie';
import { IconTop } from '../../IconTop/IconTop';
import { IconTrash } from '../../IconTrash/IconTrash';
import { IconType } from '../../IconType/IconType';
import { IconUnderline } from '../../IconUnderline/IconUnderline';
import { IconUnsort } from '../../IconUnsort/IconUnsort';
import { IconUnsortCenter } from '../../IconUnsortCenter/IconUnsortCenter';
import { IconUser } from '../../IconUser/IconUser';
import { IconVideo } from '../../IconVideo/IconVideo';
import { IconVZD } from '../../IconVZD/IconVZD';
import { IconWarning } from '../../IconWarning/IconWarning';
import { IconWatch } from '../../IconWatch/IconWatch';
import { IconWideScreen } from '../../IconWideScreen/IconWideScreen';
import { IconWorld } from '../../IconWorld/IconWorld';

import { IconsItem } from './Item/Icons-Item';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Icon.mdx';

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
  IconAddToComparison,
  IconAlert,
  IconAlignBlocksLeft,
  IconAlignBlocksRight,
  IconAlignCenter,
  IconAlignJustify,
  IconAlignLeft,
  IconAlignRight,
  IconAllDone,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArtBrush,
  IconAttach,
  IconBackward,
  IconBag,
  IconBarrier,
  IconBento,
  IconBold,
  IconBookmarkFilled,
  IconBookmarkStroked,
  IconCalculator,
  IconCalendar,
  IconCamera,
  IconCancel,
  IconCards,
  IconChat,
  IconCheck,
  IconClose,
  IconCollapse,
  IconColorFill,
  IconColorText,
  IconColumns,
  IconComment,
  IconConnection,
  IconCopy,
  IconCrown,
  IconCursorMouse,
  IconDiamond,
  IconDinosaur,
  IconDisconnection,
  IconDocAdd,
  IconDocBlank,
  IconDocDelete,
  IconDocExport,
  IconDocFilled,
  IconDown,
  IconDownload,
  IconDrag,
  IconDrillingRig,
  IconDrop,
  IconEdit,
  IconExit,
  IconExpand,
  IconEye,
  IconEyeClose,
  IconFavorite,
  IconFilter,
  IconFitToDefault,
  IconFlagFilled,
  IconFlagStroked,
  IconFolders,
  IconForward,
  IconFunnel,
  IconGas,
  IconGeo,
  IconGrouping,
  IconHamburger,
  IconHand,
  IconHealth,
  IconInComparison,
  IconIntroduction,
  IconIpad,
  IconItalic,
  IconKebab,
  IconLaptop,
  IconLayers,
  IconLeaf,
  IconLink,
  IconList,
  IconListNumbered,
  IconLock,
  IconMBU,
  IconMGRP,
  IconMLSP,
  IconMMP,
  IconMail,
  IconMap,
  IconMaxHeight,
  IconMaxWidth,
  IconMeatball,
  IconMic,
  IconMolecules,
  IconMoon,
  IconNodeEnd,
  IconNodeStart,
  IconNodeStep,
  IconNodes,
  IconOpenInNew,
  IconPanelBottom,
  IconPanelLeft,
  IconPanelRight,
  IconPanelTop,
  IconPaste,
  IconPause,
  IconPhone,
  IconPhoto,
  IconPlay,
  IconPressure,
  IconProcessing,
  IconQuestion,
  IconQuote,
  IconRUO,
  IconRUS,
  IconRecord,
  IconRemove,
  IconRemoveFromComparison,
  IconReply,
  IconResize,
  IconRestart,
  IconRevert,
  IconRing,
  IconRouble,
  IconRuler,
  IconScreen,
  IconSearch,
  IconSelect,
  IconSelectOpen,
  IconSettings,
  IconShape,
  IconShuffle,
  IconSmile,
  IconSortDown,
  IconSortDownCenter,
  IconSortUp,
  IconSortUpCenter,
  IconStop,
  IconStorage,
  IconStrikethrough,
  IconSun,
  IconTable,
  IconTarget,
  IconTeam,
  IconTest,
  IconThumbUp,
  IconTie,
  IconTop,
  IconTrash,
  IconType,
  IconUnderline,
  IconUnsort,
  IconUnsortCenter,
  IconUser,
  IconVZD,
  IconVideo,
  IconWarning,
  IconWatch,
  IconWideScreen,
  IconWorld,
} as const;

type Name = keyof typeof icons;

const names = Object.keys(icons) as Name[];

export function Playground() {
  return (
    <div className="tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full">
      {names.map((name) => (
        <IconsItem key={name} name={name} icon={icons[name]} {...defaultKnobs()} />
      ))}
    </div>
  );
}

export default {
  title: 'Components|/Icons',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
