import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';

import 'jest-enzyme';

import getWhitepaperThemes from '../themes/getWhitepaperThemes';

Enzyme.configure({ adapter: new Adapter() });

ReactDOM.createPortal = node => node;

global.WHITEPAPER_THEMES = getWhitepaperThemes();
