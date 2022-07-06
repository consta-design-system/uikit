import React from 'react';
import { select } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
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
import { IconAxesRotate } from '../../IconAxesRotate/IconAxesRotate';
import { IconBackward } from '../../IconBackward/IconBackward';
import { IconBag } from '../../IconBag/IconBag';
import { IconBarrier } from '../../IconBarrier/IconBarrier';
import { IconBento } from '../../IconBento/IconBento';
import { IconBit } from '../../IconBit/IconBit';
import { IconBold } from '../../IconBold/IconBold';
import { IconBook } from '../../IconBook/IconBook';
import { IconBookmarkFilled } from '../../IconBookmarkFilled/IconBookmarkFilled';
import { IconBookmarkStroked } from '../../IconBookmarkStroked/IconBookmarkStroked';
import { IconCalculator } from '../../IconCalculator/IconCalculator';
import { IconCalendar } from '../../IconCalendar/IconCalendar';
import { IconCamera } from '../../IconCamera/IconCamera';
import { IconCancel } from '../../IconCancel/IconCancel';
import { IconCards } from '../../IconCards/IconCards';
import { IconChatFilled } from '../../IconChatFilled/IconChatFilled';
import { IconChatStroked } from '../../IconChatStroked/IconChatStroked';
import { IconCheck } from '../../IconCheck/IconCheck';
import { IconClose } from '../../IconClose/IconClose';
import { IconCollapse } from '../../IconCollapse/IconCollapse';
import { IconColorFill } from '../../IconColorFill/IconColorFill';
import { IconColorText } from '../../IconColorText/IconColorText';
import { IconColumns } from '../../IconColumns/IconColumns';
import { IconCommentFilled } from '../../IconCommentFilled/IconCommentFilled';
import { IconCommentStroked } from '../../IconCommentStroked/IconCommentStroked';
import { IconConnection } from '../../IconConnection/IconConnection';
import { IconCopy } from '../../IconCopy/IconCopy';
import { IconCrown } from '../../IconCrown/IconCrown';
import { IconCursorMouse } from '../../IconCursorMouse/IconCursorMouse';
import { IconDataNull } from '../../IconDataNull/IconDataNull';
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
import { IconDraggable } from '../../IconDraggable/IconDraggable';
import { IconDrillingPartLeftFilled } from '../../IconDrillingPartLeftFilled/IconDrillingPartLeftFilled';
import { IconDrillingPartLeftStroked } from '../../IconDrillingPartLeftStroked/IconDrillingPartLeftStroked';
import { IconDrillingPartRightFilled } from '../../IconDrillingPartRightFilled/IconDrillingPartRightFilled';
import { IconDrillingPartRightStroked } from '../../IconDrillingPartRightStroked/IconDrillingPartRightStroked';
import { IconDrillingRig } from '../../IconDrillingRig/IconDrillingRig';
import { IconDrop } from '../../IconDrop/IconDrop';
import { IconEdit } from '../../IconEdit/IconEdit';
import { IconExit } from '../../IconExit/IconExit';
import { IconExpand } from '../../IconExpand/IconExpand';
import { IconEye } from '../../IconEye/IconEye';
import { IconEyeClose } from '../../IconEyeClose/IconEyeClose';
import { IconFavorite } from '../../IconFavorite/IconFavorite';
import { IconFilter } from '../../IconFilter/IconFilter';
import { IconFishboneFilled } from '../../IconFishboneFilled/IconFishboneFilled';
import { IconFishboneStroked } from '../../IconFishboneStroked/IconFishboneStroked';
import { IconFitToDefault } from '../../IconFitToDefault/IconFitToDefault';
import { IconFlagFilled } from '../../IconFlagFilled/IconFlagFilled';
import { IconFlagStroked } from '../../IconFlagStroked/IconFlagStroked';
import { IconFolders } from '../../IconFolders/IconFolders';
import { IconForward } from '../../IconForward/IconForward';
import { IconFunnel } from '../../IconFunnel/IconFunnel';
import { IconGas } from '../../IconGas/IconGas';
import { IconGeo } from '../../IconGeo/IconGeo';
import { IconGradients } from '../../IconGradients/IconGradients';
import { IconGrouping } from '../../IconGrouping/IconGrouping';
import { IconHamburger } from '../../IconHamburger/IconHamburger';
import { IconHand } from '../../IconHand/IconHand';
import { IconHealth } from '../../IconHealth/IconHealth';
import { IconHome } from '../../IconHome/IconHome';
import { IconIncident } from '../../IconIncident/IconIncident';
import { IconInComparison } from '../../IconInComparison/IconInComparison';
import { IconInfo } from '../../IconInfo/IconInfo';
import { IconIntroduction } from '../../IconIntroduction/IconIntroduction';
import { IconIpad } from '../../IconIpad/IconIpad';
import { IconItalic } from '../../IconItalic/IconItalic';
import { IconKebab } from '../../IconKebab/IconKebab';
import { IconKernFilled } from '../../IconKernFilled/IconKernFilled';
import { IconKernStroked } from '../../IconKernStroked/IconKernStroked';
import { IconLaptop } from '../../IconLaptop/IconLaptop';
import { IconLayers } from '../../IconLayers/IconLayers';
import { IconLeaf } from '../../IconLeaf/IconLeaf';
import { IconLightningBolt } from '../../IconLightningBolt/IconLightningBolt';
import { IconLineAndBarChart } from '../../IconLineAndBarChart/IconLineAndBarChart';
import { IconLink } from '../../IconLink/IconLink';
import { IconList } from '../../IconList/IconList';
import { IconListNumbered } from '../../IconListNumbered/IconListNumbered';
import { IconLithologyFilled } from '../../IconLithologyFilled/IconLithologyFilled';
import { IconLithologyStroked } from '../../IconLithologyStroked/IconLithologyStroked';
import { IconLock } from '../../IconLock/IconLock';
import { IconLogicalElement } from '../../IconLogicalElement/IconLogicalElement';
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
import { IconOilBarrel } from '../../IconOilBarrel/IconOilBarrel';
import { IconOpenInNew } from '../../IconOpenInNew/IconOpenInNew';
import { IconOperators } from '../../IconOperators/IconOperators';
import { IconPanelBottom } from '../../IconPanelBottom/IconPanelBottom';
import { IconPanelLeft } from '../../IconPanelLeft/IconPanelLeft';
import { IconPanelRight } from '../../IconPanelRight/IconPanelRight';
import { IconPanelTop } from '../../IconPanelTop/IconPanelTop';
import { IconPaste } from '../../IconPaste/IconPaste';
import { IconPause } from '../../IconPause/IconPause';
import { IconPhone } from '../../IconPhone/IconPhone';
import { IconPhoto } from '../../IconPhoto/IconPhoto';
import { IconPicture } from '../../IconPicture/IconPicture';
import { IconPlay } from '../../IconPlay/IconPlay';
import { IconPressureFilled } from '../../IconPressureFilled/IconPressureFilled';
import { IconPressureStroked } from '../../IconPressureStroked/IconPressureStroked';
import { IconPriceLabel } from '../../IconPriceLabel/IconPriceLabel';
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
import { IconSave } from '../../IconSave/IconSave';
import { IconScreen } from '../../IconScreen/IconScreen';
import { IconSearch } from '../../IconSearch/IconSearch';
import { IconSelect } from '../../IconSelect/IconSelect';
import { IconSelectOpen } from '../../IconSelectOpen/IconSelectOpen';
import { IconSendMessage } from '../../IconSendMessage/IconSendMessage';
import { IconSettings } from '../../IconSettings/IconSettings';
import { IconShape } from '../../IconShape/IconShape';
import { IconShuffle } from '../../IconShuffle/IconShuffle';
import { IconSmile } from '../../IconSmile/IconSmile';
import { IconSnowflake } from '../../IconSnowflake/IconSnowflake';
import { IconSortDown } from '../../IconSortDown/IconSortDown';
import { IconSortDownCenter } from '../../IconSortDownCenter/IconSortDownCenter';
import { IconSortUp } from '../../IconSortUp/IconSortUp';
import { IconSortUpCenter } from '../../IconSortUpCenter/IconSortUpCenter';
import { IconSpeed } from '../../IconSpeed/IconSpeed';
import { IconStop } from '../../IconStop/IconStop';
import { IconStorage } from '../../IconStorage/IconStorage';
import { IconStrikethrough } from '../../IconStrikethrough/IconStrikethrough';
import { IconString } from '../../IconString/IconString';
import { IconSun } from '../../IconSun/IconSun';
import { IconTable } from '../../IconTable/IconTable';
import { IconTable2 } from '../../IconTable2/IconTable2';
import { IconTarget } from '../../IconTarget/IconTarget';
import { IconTeam } from '../../IconTeam/IconTeam';
import { IconTechResponse } from '../../IconTechResponse/IconTechResponse';
import { IconTest } from '../../IconTest/IconTest';
import { IconThumbUp } from '../../IconThumbUp/IconThumbUp';
import { IconTie } from '../../IconTie/IconTie';
import { IconTop } from '../../IconTop/IconTop';
import { IconTrajectory } from '../../IconTrajectory/IconTrajectory';
import { IconTrash } from '../../IconTrash/IconTrash';
import { IconType } from '../../IconType/IconType';
import { IconUnderline } from '../../IconUnderline/IconUnderline';
import { IconUnlock } from '../../IconUnlock/IconUnlock';
import { IconUnsort } from '../../IconUnsort/IconUnsort';
import { IconUnsortCenter } from '../../IconUnsortCenter/IconUnsortCenter';
import { IconUpload } from '../../IconUpload/IconUpload';
import { IconUser } from '../../IconUser/IconUser';
import { IconVideo } from '../../IconVideo/IconVideo';
import { IconVZD } from '../../IconVZD/IconVZD';
import { IconWarning } from '../../IconWarning/IconWarning';
import { IconWatch } from '../../IconWatch/IconWatch';
import { IconWellOpen } from '../../IconWellOpen/IconWellOpen';
import { IconWellPipe } from '../../IconWellPipe/IconWellPipe';
import { IconWideScreen } from '../../IconWideScreen/IconWideScreen';
import { IconWorldFilled } from '../../IconWorldFilled/IconWorldFilled';
import { IconWorldStroked } from '../../IconWorldStroked/IconWorldStroked';
import { IconWrench } from '../../IconWrench/IconWrench';

import { IconsItem } from './Item/Icons-Item';
import mdx from './Icon.docs.mdx';

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
  IconAxesRotate,
  IconBackward,
  IconBag,
  IconBarrier,
  IconBento,
  IconBit,
  IconBold,
  IconBook,
  IconBookmarkFilled,
  IconBookmarkStroked,
  IconCalculator,
  IconCalendar,
  IconCamera,
  IconCancel,
  IconCards,
  IconChatFilled,
  IconChatStroked,
  IconCheck,
  IconClose,
  IconCollapse,
  IconColorFill,
  IconColorText,
  IconColumns,
  IconCommentFilled,
  IconCommentStroked,
  IconConnection,
  IconCopy,
  IconCrown,
  IconCursorMouse,
  IconDataNull,
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
  IconDraggable,
  IconDrillingPartLeftFilled,
  IconDrillingPartLeftStroked,
  IconDrillingPartRightFilled,
  IconDrillingPartRightStroked,
  IconDrillingRig,
  IconDrop,
  IconEdit,
  IconExit,
  IconExpand,
  IconEye,
  IconEyeClose,
  IconFavorite,
  IconFilter,
  IconFishboneFilled,
  IconFishboneStroked,
  IconFitToDefault,
  IconFlagFilled,
  IconFlagStroked,
  IconFolders,
  IconForward,
  IconFunnel,
  IconGas,
  IconGeo,
  IconGradients,
  IconGrouping,
  IconHamburger,
  IconHand,
  IconHealth,
  IconHome,
  IconInComparison,
  IconIncident,
  IconInfo,
  IconIntroduction,
  IconIpad,
  IconItalic,
  IconKebab,
  IconKernFilled,
  IconKernStroked,
  IconLaptop,
  IconLayers,
  IconLeaf,
  IconLightningBolt,
  IconLineAndBarChart,
  IconLink,
  IconList,
  IconListNumbered,
  IconLithologyFilled,
  IconLithologyStroked,
  IconLock,
  IconLogicalElement,
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
  IconOilBarrel,
  IconOpenInNew,
  IconOperators,
  IconPanelBottom,
  IconPanelLeft,
  IconPanelRight,
  IconPanelTop,
  IconPaste,
  IconPause,
  IconPhone,
  IconPhoto,
  IconPicture,
  IconPlay,
  IconPressureFilled,
  IconPressureStroked,
  IconPriceLabel,
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
  IconSave,
  IconScreen,
  IconSearch,
  IconSelect,
  IconSelectOpen,
  IconSendMessage,
  IconSettings,
  IconShape,
  IconShuffle,
  IconSmile,
  IconSnowflake,
  IconSortDown,
  IconSortDownCenter,
  IconSortUp,
  IconSortUpCenter,
  IconSpeed,
  IconStop,
  IconStorage,
  IconStrikethrough,
  IconString,
  IconSun,
  IconTable,
  IconTable2,
  IconTarget,
  IconTeam,
  IconTechResponse,
  IconTest,
  IconThumbUp,
  IconTie,
  IconTop,
  IconTrajectory,
  IconTrash,
  IconType,
  IconUnderline,
  IconUnlock,
  IconUnsort,
  IconUnsortCenter,
  IconUpload,
  IconUser,
  IconVZD,
  IconVideo,
  IconWarning,
  IconWatch,
  IconWellOpen,
  IconWellPipe,
  IconWideScreen,
  IconWorldFilled,
  IconWorldStroked,
  IconWrench,
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

export default createMetadata({
  title: 'Компоненты|/Графика/Icons',
  id: 'components/Icons',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/SLc0YGhuDotve6MTCBHlGxDU/Consta-Graphics?node-id=0%3A1',
    },
  },
});
