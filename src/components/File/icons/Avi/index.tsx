import React from 'react';
import File from '../../../File';

const SVG_S = (
  <React.Fragment>
    <path
      fill="#FCD55F"
      d="M19.6 0H1.4A1.4 1.4 0 000 1.4v25.2A1.4 1.4 0 001.4 28h18.2a1.4 1.4 0 001.4-1.4V1.4A1.4 1.4 0 0019.6 0z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M17 12v13H4V12h13zm-3 12h2v-2h-2v2zm0-3h2v-2h-2v2zm-1-2v5.056H8V19h5zm0-1H8v-5.056h5V18zm1 0h2v-2h-2v2zm0-3h2v-2h-2v2zm-7 1v2H5v-2h2zm-2 5v-2h2v2H5zm0 1v2h2v-2H5zm2-7v-2H5v2h2z"
      clipRule="evenodd"
      opacity=".7"
    />
    <path fill="#fff" d="M16 3V2h-1v1h1zM14 4v1h1v3h-1v1h3V8h-1V4h-2z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M8.95 9a.659.659 0 01-.29-.08.818.818 0 01-.26-.22.73.73 0 01-.61.3H6.45c-.507 0-.877-.1-1.11-.3C5.113 8.493 5 8.143 5 7.65v-.1C5 6.517 5.487 6 6.46 6H8v-.35c0-.207-.063-.367-.19-.48-.127-.113-.313-.17-.56-.17H5.5V4h1.8c.58 0 1.007.127 1.28.38.28.253.42.66.42 1.22V8c0 .1.037.177.11.23.08.047.21.07.39.07V9h-.55zM7.54 8c.2 0 .327-.047.38-.14A.72.72 0 008 7.5V7H6.6a.583.583 0 00-.599.554c.008.146.048.255.119.326.08.08.207.12.38.12h1.04z"
      clipRule="evenodd"
    />
    <path fill="#fff" d="M11 4h-1v3l1 2h1l1-2V4h-1v3h-1V4z" />
  </React.Fragment>
);

const SVG_M = (
  <React.Fragment>
    <path fill="#FCD55F" d="M28 0H2a2 2 0 00-2 2v36a2 2 0 002 2h26a2 2 0 002-2V2a2 2 0 00-2-2z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M24 18v17H7V18h17zm-3 .944h2V20h-2v-1.056zm0 15.112h2V33h-2v1.056zM21 32h2v-2h-2v2zm0-3h2v-2h-2v2zm-1-2v7.056h-9V27h9zm0-1h-9v-7.056h9V26zm1 0h2v-2h-2v2zm0-3h2v-2h-2v2zm-11 1v2H8v-2h2zm-2 5v-2h2v2H8zm0 1v2h2v-2H8zm0 4.056V33h2v1.056H8zM10 23v-2H8v2h2zm-2-4.056V20h2v-1.056H8z"
      clipRule="evenodd"
      opacity=".7"
    />
    <path fill="#fff" d="M20 6V5h-1v1h1zM18 7v1h1v3h-1v1h3v-1h-1V7h-2z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M12.95 12a.66.66 0 01-.29-.08.818.818 0 01-.26-.22.73.73 0 01-.61.3h-1.34c-.507 0-.877-.1-1.11-.3-.227-.207-.34-.557-.34-1.05v-.1C9 9.517 9.487 9 10.46 9H12v-.35c0-.207-.063-.367-.19-.48-.127-.113-.313-.17-.56-.17H9.5V7h1.8c.58 0 1.007.127 1.28.38.28.253.42.66.42 1.22V11c0 .1.037.177.11.23.08.047.21.07.39.07v.7h-.55zm-1.41-1c.2 0 .327-.047.38-.14a.72.72 0 00.08-.36V10h-1.4a.583.583 0 00-.599.554c.008.146.048.255.119.326.08.08.207.12.38.12h1.04z"
      clipRule="evenodd"
    />
    <path fill="#fff" d="M15 7h-1v3l1 2h1l1-2V7h-1v3h-1V7z" />
  </React.Fragment>
);

const Avi = props => {
  let svg;

  if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <File {...props}>{svg}</File>;
};

export default Avi;
