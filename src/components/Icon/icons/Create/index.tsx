import React from 'react';

import { Icon } from '../../../index';

const SVG_M = (
  <path d="M3 17.2501V21.0001H6.75L17.81 9.94006L14.06 6.19006L3 17.2501ZM20.71 7.04006C21.1 6.65006 21.1 6.02006 20.71 5.63006L18.37 3.29006C17.98 2.90006 17.35 2.90006 16.96 3.29006L15.13 5.12006L18.88 8.87006L20.71 7.04006Z" />
);

const Create = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_M;
  else if (props.size === 's')
    // TODO
    svg = SVG_M;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Create;
