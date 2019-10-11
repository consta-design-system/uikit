import React from 'react';
import Add from './components/Add';
import Alert from './components/Alert';
import AlignCenter from './components/AlignCenter';
import AlignJustify from './components/AlignJustify';
import AlignLeft from './components/AlignLeft';
import AlignRight from './components/AlignRight';
import AllDone from './components/AllDone';
import ArrowDown from './components/ArrowDown';
import ArrowLeft from './components/ArrowLeft';
import ArrowRight from './components/ArrowRight';
import ArrowUp from './components/ArrowUp';
import Attach from './components/Attach';
import Backward from './components/Backward';
import Barrier from './components/Barrier';
import Bold from './components/Bold';
import Calendar from './components/Calendar';
import Camera from './components/Camera';
import Cancel from './components/Cancel';
import Chat from './components/Chat';
import Check from './components/Check';
import Close from './components/Close';
import Collapse from './components/Collapse';
import ColorFill from './components/ColorFill';
import ColorText from './components/ColorText';
import Columns from './components/Columns';
import Comment from './components/Comment';
import Copy from './components/Copy';
import Create from './components/Create';
import Diamond from './components/Diamond';
import DocAdd from './components/DocAdd';
import DocBlank from './components/DocBlank';
import DocDelete from './components/DocDelete';
import DocFilled from './components/DocFilled';
import Down from './components/Down';
import Drag from './components/Drag';
import Edit from './components/Edit';
import Expand from './components/Expand';
import Eye from './components/Eye';
import Favorite from './components/Favorite';
import Forward from './components/Forward';
import Gas from './components/Gas';
import Hamburger from './components/Hamburger';
import Incident from './components/Incident';
import Italic from './components/Italic';
import Kebab from './components/Kebab';
import Leaf from './components/Leaf';
import Link from './components/Link';
import ListNumbered from './components/ListNumbered';
import List from './components/List';
import Lock from './components/Lock';
import Mail from './components/Mail';
import Meatball from './components/Meatball';
import Pause from './components/Pause';
import Photo from './components/Photo';
import Play from './components/Play';
import Processing from './components/Processing';
import Question from './components/Question';
import Quote from './components/Quote';
import Record from './components/Record';
import Ring from './components/Ring';
import Rouble from './components/Rouble';
import Save1 from './components/Save1';
import Save2 from './components/Save2';
import Search from './components/Search';
import SelectOpen from './components/SelectOpen';
import Select from './components/Select';
import Settings from './components/Settings';
import SortDown2 from './components/SortDown2';
import SortDown from './components/SortDown';
import SortUp2 from './components/SortUp2';
import SortUp from './components/SortUp';
import Stop from './components/Stop';
import Strikethrough from './components/Strikethrough';
import Table2 from './components/Table2';
import Table3 from './components/Table3';
import Table from './components/Table';
import Test from './components/Test';
import ThumbUp from './components/ThumbUp';
import Tie from './components/Tie';
import Top from './components/Top';
import Trash from './components/Trash';
import Type from './components/Type';
import Underline from './components/Underline';
import User from './components/User';
import Warning from './components/Warning';
import World from './components/World';

const Icon = props => {
  switch (props.name) {
    case 'add':
      return <Add {...props} />;
    case 'alert':
      return <Alert {...props} />;
    case 'alignCenter':
      return <AlignCenter {...props} />;
    case 'alignJustify':
      return <AlignJustify {...props} />;
    case 'alignLeft':
      return <AlignLeft {...props} />;
    case 'alignRight':
      return <AlignRight {...props} />;
    case 'allDone':
      return <AllDone {...props} />;
    case 'arrowDown':
      return <ArrowDown {...props} />;
    case 'arrowLeft':
      return <ArrowLeft {...props} />;
    case 'arrowRight':
      return <ArrowRight {...props} />;
    case 'arrowUp':
      return <ArrowUp {...props} />;
    case 'attach':
      return <Attach {...props} />;
    case 'backward':
      return <Backward {...props} />;
    case 'barrier':
      return <Barrier {...props} />;
    case 'bold':
      return <Bold {...props} />;
    case 'calendar':
      return <Calendar {...props} />;
    case 'camera':
      return <Camera {...props} />;
    case 'cancel':
      return <Cancel {...props} />;
    case 'chat':
      return <Chat {...props} />;
    case 'check':
      return <Check {...props} />;
    case 'close':
      return <Close {...props} />;
    case 'collapse':
      return <Collapse {...props} />;
    case 'colorFill':
      return <ColorFill {...props} />;
    case 'colorText':
      return <ColorText {...props} />;
    case 'columns':
      return <Columns {...props} />;
    case 'comment':
      return <Comment {...props} />;
    case 'copy':
      return <Copy {...props} />;
    case 'create':
      return <Create {...props} />;
    case 'diamond':
      return <Diamond {...props} />;
    case 'docAdd':
      return <DocAdd {...props} />;
    case 'docBlank':
      return <DocBlank {...props} />;
    case 'docDelete':
      return <DocDelete {...props} />;
    case 'docFilled':
      return <DocFilled {...props} />;
    case 'down':
      return <Down {...props} />;
    case 'drag':
      return <Drag {...props} />;
    case 'edit':
      return <Edit {...props} />;
    case 'expand':
      return <Expand {...props} />;
    case 'eye':
      return <Eye {...props} />;
    case 'favorite':
      return <Favorite {...props} />;
    case 'forward':
      return <Forward {...props} />;
    case 'gas':
      return <Gas {...props} />;
    case 'hamburger':
      return <Hamburger {...props} />;
    case 'incident':
      return <Incident {...props} />;
    case 'italic':
      return <Italic {...props} />;
    case 'kebab':
      return <Kebab {...props} />;
    case 'leaf':
      return <Leaf {...props} />;
    case 'link':
      return <Link {...props} />;
    case 'listNumbered':
      return <ListNumbered {...props} />;
    case 'list':
      return <List {...props} />;
    case 'lock':
      return <Lock {...props} />;
    case 'mail':
      return <Mail {...props} />;
    case 'meatball':
      return <Meatball {...props} />;
    case 'pause':
      return <Pause {...props} />;
    case 'photo':
      return <Photo {...props} />;
    case 'play':
      return <Play {...props} />;
    case 'processing':
      return <Processing {...props} />;
    case 'question':
      return <Question {...props} />;
    case 'quote':
      return <Quote {...props} />;
    case 'record':
      return <Record {...props} />;
    case 'ring':
      return <Ring {...props} />;
    case 'rouble':
      return <Rouble {...props} />;
    case 'save1':
      return <Save1 {...props} />;
    case 'save2':
      return <Save2 {...props} />;
    case 'search':
      return <Search {...props} />;
    case 'selectOpen':
      return <SelectOpen {...props} />;
    case 'select':
      return <Select {...props} />;
    case 'settings':
      return <Settings {...props} />;
    case 'sortDown2':
      return <SortDown2 {...props} />;
    case 'sortDown':
      return <SortDown {...props} />;
    case 'sortUp2':
      return <SortUp2 {...props} />;
    case 'sortUp':
      return <SortUp {...props} />;
    case 'stop':
      return <Stop {...props} />;
    case 'strikethrough':
      return <Strikethrough {...props} />;
    case 'table2':
      return <Table2 {...props} />;
    case 'table3':
      return <Table3 {...props} />;
    case 'table':
      return <Table {...props} />;
    case 'test':
      return <Test {...props} />;
    case 'thumbUp':
      return <ThumbUp {...props} />;
    case 'tie':
      return <Tie {...props} />;
    case 'top':
      return <Top {...props} />;
    case 'trash':
      return <Trash {...props} />;
    case 'type':
      return <Type {...props} />;
    case 'underline':
      return <Underline {...props} />;
    case 'user':
      return <User {...props} />;
    case 'warning':
      return <Warning {...props} />;
    case 'world':
      return <World {...props} />;

    default:
      return;
  }
};
export default Icon;
