import React from 'react';
import File from '../../../File';

const SVG_S = (
  <React.Fragment>
    <path
      fill="#C3CAD1"
      d="M19.6 0H1.4A1.4 1.4 0 000 1.4v25.2A1.4 1.4 0 001.4 28h18.2a1.4 1.4 0 001.4-1.4V1.4A1.4 1.4 0 0019.6 0z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M7 12H4v13h13V12h-3v1h2v11H5V13h2v-1zm1 0h3v1h2v1h-2v1h2v1h-2v1h2v1h-2v1h1v4H9v-4h1v-2H8v-1h2v-1H8v-1h2v-1H8v-1zm3 8h-1v2h1v-2z"
      clipRule="evenodd"
      opacity=".6"
    />
    <path
      fill="#fff"
      d="M11 2v1h-1V2h1zM9 5V4h2v4h1v1H9V8h1V5H9zM8 9H4V8l2.5-3H4V4h4v1L5.68 8H8v1z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M13.8 4v.24c.207-.16.473-.24.8-.24h.7c.587 0 1.017.127 1.29.38.273.247.41.653.41 1.22v1.8c0 .56-.14.967-.42 1.22-.273.253-.7.38-1.28.38h-1.29v2H13V4h.8zm.85 1c-.22 0-.383.06-.49.18a.53.53 0 00-.16.37L14.01 8h1.24c.247 0 .433-.057.56-.17.127-.113.19-.273.19-.48v-1.7c0-.207-.063-.367-.19-.48-.127-.113-.313-.17-.56-.17h-.6z"
      clipRule="evenodd"
    />
  </React.Fragment>
);

const SVG_M = (
  <React.Fragment>
    <path fill="#C3CAD1" d="M28 0H2a2 2 0 00-2 2v36a2 2 0 002 2h26a2 2 0 002-2V2a2 2 0 00-2-2z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M12 17H8v17h15V17h-4v1h3v15H9V18h3v-1zm1 0h3v1h2v1h-2v1h2v1h-2v1h2v1h-2v1h2v1h-2v1h2v1h-2v1h1v4h-3v-4h1v-2h-2v-1h2v-1h-2v-1h2v-1h-2v-1h2v-1h-2v-1h2v-1h-2v-1zm3 12h-1v2h1v-2z"
      clipRule="evenodd"
      opacity=".6"
    />
    <path
      fill="#fff"
      d="M16 5v1h-1V5h1zM14 8V7h2v4h1v1h-3v-1h1V8h-1zM13 12H9v-1l2.5-3H9V7h4v1l-2.32 3H13v1z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M18.8 7v.24c.207-.16.473-.24.8-.24h.7c.587 0 1.017.127 1.29.38.273.247.41.653.41 1.22v1.8c0 .56-.14.967-.42 1.22-.273.253-.7.38-1.28.38h-1.29v2H18V7h.8zm.85 1c-.22 0-.383.06-.49.18a.53.53 0 00-.16.37l.01 2.45h1.24c.247 0 .433-.057.56-.17.127-.113.19-.273.19-.48v-1.7c0-.207-.063-.367-.19-.48-.127-.113-.313-.17-.56-.17h-.6z"
      clipRule="evenodd"
    />
  </React.Fragment>
);

const Zip = props => {
  let svg;

  if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <File {...props}>{svg}</File>;
};

export default Zip;
