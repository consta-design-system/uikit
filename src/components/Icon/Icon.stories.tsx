import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import IconAdd from './icons/Add';
import IconAlert from './icons/Alert';
import IconAlignCenter from './icons/AlignCenter';
import IconAlignJustify from './icons/AlignJustify';
import IconAlignLeft from './icons/AlignLeft';
import IconAlignRight from './icons/AlignRight';
import IconArrowDown from './icons/ArrowDown';
import IconArrowLeft from './icons/ArrowLeft';
import IconArrowRight from './icons/ArrowRight';
import IconArrowUp from './icons/ArrowUp';
import IconAttach from './icons/Attach';
import IconBackward from './icons/Backward';
import IconBarrier from './icons/Barrier';
import IconBento from './icons/Bento';
import IconBold from './icons/Bold';
import IconCalendar from './icons/Calendar';
import IconCamera from './icons/Camera';
import IconCancel from './icons/Cancel';
import IconChat from './icons/Chat';
import IconCheck from './icons/Check';
import IconClose from './icons/Close';
import IconCollapse from './icons/Collapse';
import IconColorFill from './icons/ColorFill';
import IconColorText from './icons/ColorText';
import IconColumns from './icons/Columns';
import IconComment from './icons/Comment';
import IconConnection from './icons/Connection';
import IconCopy from './icons/Copy';
import IconCreate from './icons/Create';
import IconCrown from './icons/Crown';
import IconDiamond from './icons/Diamond';
import IconDown from './icons/Down';
import IconDrag from './icons/Drag';
import IconDrop from './icons/Drop';
import IconEdit from './icons/Edit';
import IconExpand from './icons/Expand';
import IconEye from './icons/Eye';
import IconFavorite from './icons/Favorite';
import IconFilter from './icons/Filter';
import IconForward from './icons/Forward';
import IconFunnel from './icons/Funnel';
import IconGas from './icons/Gas';
import IconHamburger from './icons/Hamburger';
import IconItalic from './icons/Italic';
import IconKebab from './icons/Kebab';
import IconLeaf from './icons/Leaf';
import IconLink from './icons/Link';
import IconList from './icons/List';
import IconListNumbered from './icons/ListNumbered';
import IconLock from './icons/Lock';
import IconMail from './icons/Mail';
import IconMeatball from './icons/Meatball';
import IconOpenInNew from './icons/OpenInNew';
import IconPause from './icons/Pause';
import IconPhoto from './icons/Photo';
import IconPlay from './icons/Play';
import IconProcessing from './icons/Processing';
import IconQuestion from './icons/Question';
import IconQuote from './icons/Quote';
import IconRecord from './icons/Record';
import IconRemove from './icons/Remove';
import IconRevert from './icons/Revert';
import IconRing from './icons/Ring';
import IconRouble from './icons/Rouble';
import IconSave1 from './icons/Save1';
import IconSave2 from './icons/Save2';
import IconSearch from './icons/Search';
import IconSelect from './icons/Select';
import IconSelectOpen from './icons/SelectOpen';
import IconSettings from './icons/Settings';
import IconShuffle from './icons/Shuffle';
import IconSortDown from './icons/SortDown';
import IconSortDown2 from './icons/SortDown2';
import IconSortUp from './icons/SortUp';
import IconSortUp2 from './icons/SortUp2';
import IconStop from './icons/Stop';
import IconStrikethrough from './icons/Strikethrough';
import IconTable from './icons/Table';
import IconTest from './icons/Test';
import IconThumbUp from './icons/ThumbUp';
import IconTie from './icons/Tie';
import IconTop from './icons/Top';
import IconTrash from './icons/Trash';
import IconType from './icons/Type';
import IconUnderline from './icons/Underline';
import IconUser from './icons/User';
import IconWorld from './icons/World';

const defaultKnobs = () => ({
  view: select(
    'View',
    ['primary', 'secondary', 'ghost', 'link', 'brand', 'alert', 'warning', 'success'],
    'primary',
  ),
  size: select('Size', ['xs', 's', 'm'], 's'),
});

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add('Icon', () => (
    <div>
      <IconAdd {...defaultKnobs()} />
      <IconAlert {...defaultKnobs()} />
      <IconAlignCenter {...defaultKnobs()} />
      <IconAlignJustify {...defaultKnobs()} />
      <IconAlignLeft {...defaultKnobs()} />
      <IconAlignRight {...defaultKnobs()} />
      <IconArrowDown {...defaultKnobs()} />
      <IconArrowLeft {...defaultKnobs()} />
      <IconArrowRight {...defaultKnobs()} />
      <IconArrowUp {...defaultKnobs()} />
      <IconAttach {...defaultKnobs()} />
      <IconBackward {...defaultKnobs()} />
      <IconBarrier {...defaultKnobs()} />
      <IconBento {...defaultKnobs()} />
      <IconBold {...defaultKnobs()} />
      <IconCalendar {...defaultKnobs()} />
      <IconCamera {...defaultKnobs()} />
      <IconCancel {...defaultKnobs()} />
      <IconChat {...defaultKnobs()} />
      <IconCheck {...defaultKnobs()} />
      <IconClose {...defaultKnobs()} />
      <IconCollapse {...defaultKnobs()} />
      <IconColorFill {...defaultKnobs()} />
      <IconColorText {...defaultKnobs()} />
      <IconColumns {...defaultKnobs()} />
      <IconComment {...defaultKnobs()} />
      <IconConnection {...defaultKnobs()} />
      <IconCopy {...defaultKnobs()} />
      <IconCreate {...defaultKnobs()} />
      <IconCrown {...defaultKnobs()} />
      <IconDiamond {...defaultKnobs()} />
      <IconDown {...defaultKnobs()} />
      <IconDrag {...defaultKnobs()} />
      <IconDrop {...defaultKnobs()} />
      <IconEdit {...defaultKnobs()} />
      <IconExpand {...defaultKnobs()} />
      <IconEye {...defaultKnobs()} />
      <IconFavorite {...defaultKnobs()} />
      <IconFilter {...defaultKnobs()} />
      <IconForward {...defaultKnobs()} />
      <IconFunnel {...defaultKnobs()} />
      <IconGas {...defaultKnobs()} />
      <IconHamburger {...defaultKnobs()} />
      <IconItalic {...defaultKnobs()} />
      <IconKebab {...defaultKnobs()} />
      <IconLeaf {...defaultKnobs()} />
      <IconLink {...defaultKnobs()} />
      <IconList {...defaultKnobs()} />
      <IconListNumbered {...defaultKnobs()} />
      <IconLock {...defaultKnobs()} />
      <IconMail {...defaultKnobs()} />
      <IconMeatball {...defaultKnobs()} />
      <IconOpenInNew {...defaultKnobs()} />
      <IconPause {...defaultKnobs()} />
      <IconPhoto {...defaultKnobs()} />
      <IconPlay {...defaultKnobs()} />
      <IconProcessing {...defaultKnobs()} />
      <IconQuestion {...defaultKnobs()} />
      <IconQuote {...defaultKnobs()} />
      <IconRecord {...defaultKnobs()} />
      <IconRemove {...defaultKnobs()} />
      <IconRevert {...defaultKnobs()} />
      <IconRing {...defaultKnobs()} />
      <IconRouble {...defaultKnobs()} />
      <IconSave1 {...defaultKnobs()} />
      <IconSave2 {...defaultKnobs()} />
      <IconSearch {...defaultKnobs()} />
      <IconSelect {...defaultKnobs()} />
      <IconSelectOpen {...defaultKnobs()} />
      <IconSettings {...defaultKnobs()} />
      <IconShuffle {...defaultKnobs()} />
      <IconSortDown {...defaultKnobs()} />
      <IconSortDown2 {...defaultKnobs()} />
      <IconSortUp {...defaultKnobs()} />
      <IconSortUp2 {...defaultKnobs()} />
      <IconStop {...defaultKnobs()} />
      <IconStrikethrough {...defaultKnobs()} />
      <IconTable {...defaultKnobs()} />
      <IconTest {...defaultKnobs()} />
      <IconThumbUp {...defaultKnobs()} />
      <IconTie {...defaultKnobs()} />
      <IconTop {...defaultKnobs()} />
      <IconTrash {...defaultKnobs()} />
      <IconType {...defaultKnobs()} />
      <IconUnderline {...defaultKnobs()} />
      <IconUser {...defaultKnobs()} />
      <IconWorld {...defaultKnobs()} />
    </div>
  ));
