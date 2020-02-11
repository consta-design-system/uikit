import React from 'react';
import File from '../../../File';

const SVG_S = (
  <path
    fill="#C3CAD1"
    d="M19.6 0H1.4A1.4 1.4 0 000 1.4v25.2A1.4 1.4 0 001.4 28h18.2a1.4 1.4 0 001.4-1.4V1.4A1.4 1.4 0 0019.6 0z"
  />
);

const SVG_M = (
  <path fill="#C3CAD1" d="M28 0H2a2 2 0 00-2 2v36a2 2 0 002 2h26a2 2 0 002-2V2a2 2 0 00-2-2z" />
);

const Loading = props => {
  let svg;

  if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <File {...props}>{svg}</File>;
};

export default Loading;
