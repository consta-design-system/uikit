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
    <div className={'tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full'}>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconAdd {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Add</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconAlert {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Alert</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconAlignCenter {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>AlignCenter</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconAlignJustify {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>AlignJustify</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconAlignLeft {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>AlignLeft</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconAlignRight {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>AlignRight</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconArrowDown {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>ArrowDown</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconArrowLeft {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>ArrowLeft</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconArrowRight {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>ArrowRight</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconArrowUp {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>ArrowUp</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconAttach {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Attach</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconBackward {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Backward</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconBarrier {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Barrier</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconBento {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Bento</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconBold {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Bold</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconCalendar {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Calendar</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconCamera {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Camera</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconCancel {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Cancel</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconChat {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Chat</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconCheck {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Check</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconClose {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Close</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconCollapse {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Collapse</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconColorFill {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>ColorFill</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconColorText {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>ColorText</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconColumns {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Columns</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconComment {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Comment</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconConnection {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Connection</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconCopy {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Copy</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconCreate {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Create</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconCrown {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Crown</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconDiamond {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Diamond</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconDown {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Down</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconDrag {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Drag</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconDrop {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Drop</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconEdit {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Edit</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconExpand {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Expand</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconEye {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Eye</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconFavorite {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Favorite</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconFilter {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Filter</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconForward {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Forward</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconFunnel {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Funnel</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconGas {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Gas</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconHamburger {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Hamburger</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconItalic {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Italic</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconKebab {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Kebab</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconLeaf {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Leaf</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconLink {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Link</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconList {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>List</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconListNumbered {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>ListNumbered</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconLock {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Lock</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconMail {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Mail</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconMeatball {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Meatball</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconOpenInNew {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>OpenInNew</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconPause {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Pause</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconPhoto {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Photo</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconPlay {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Play</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconProcessing {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Processing</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconQuestion {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Question</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconQuote {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Quote</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconRecord {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Record</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconRemove {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Remove</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconRevert {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Revert</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconRing {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Ring</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconRouble {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Rouble</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSave1 {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Save1</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSave2 {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Save2</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSearch {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Search</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSelect {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Select</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSelectOpen {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>SelectOpen</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSettings {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Settings</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconShuffle {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Shuffle</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSortDown {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>SortDown</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSortDown2 {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>SortDown2</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSortUp {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>SortUp</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconSortUp2 {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>SortUp2</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconStop {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Stop</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconStrikethrough {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Strikethrough</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconTable {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Table</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconTest {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Test</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconThumbUp {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>ThumbUp</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconTie {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Tie</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconTop {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Top</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconTrash {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Trash</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconType {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Type</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconUnderline {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>Underline</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconUser {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>User</div>
      </div>
      <div className={'tpl-grid__fraction text text_align_center'}>
        <IconWorld {...defaultKnobs()} />
        <div className={'text_size_s text_view_secondary'}>World</div>
      </div>
    </div>
  ));
