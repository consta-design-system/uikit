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
      d="M14 10.64c0 .56-.027.98-.08 1.26-.053.267-.173.54-.36.82L11.04 15v2H9v-2.5l2.92-2.92c.053-.187.08-.44.08-.76v-.52c0-.413-.12-.733-.36-.96-.24-.227-.607-.34-1.1-.34H8V7h2.3c2.24 0 3.7 1 3.7 3v.64zM11 19v2H9v-2h2z"
    />
  </React.Fragment>
);

const SVG_M = (
  <React.Fragment>
    <path fill="#C3CAD1" d="M28 0H2a2 2 0 00-2 2v36a2 2 0 002 2h26a2 2 0 002-2V2a2 2 0 00-2-2z" />
    <path
      fill="#fff"
      d="M19 16.64c0 .56-.027.98-.08 1.26-.053.267-.173.54-.36.82L16.04 21v2H14v-2.5l2.92-2.92c.053-.187.08-.44.08-.76v-.52c0-.413-.12-.733-.36-.96-.24-.227-.607-.34-1.1-.34H13v-2h2.3c2.24 0 3.7 1 3.7 3v.64zM16 25v2h-2v-2h2z"
    />
  </React.Fragment>
);

const Add = props => {
  let svg;

  if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <File {...props}>{svg}</File>;
};

export default Add;
