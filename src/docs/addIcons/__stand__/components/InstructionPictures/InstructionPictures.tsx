import React from 'react';

import icons4 from './images/4-figma-union.png';
import icons7 from './images/7-figma.png';
import icons8 from './images/8-github.png';
import icons9 from './images/9-figma.png';
import icons10 from './images/10-finder.png';
import icons11 from './images/11-github.png';

export const InstructionPictures = ({ name }: { name: string }) => {
  if (name === '4-figma-union') {
    return <img src={icons4} alt="" />;
  }
  if (name === '7-figma') {
    return (
      <p>
        <img src={icons7} alt="" />
      </p>
    );
  }
  if (name === '8-github') {
    return (
      <p>
        <img src={icons8} alt="" />
      </p>
    );
  }
  if (name === '9-figma') {
    return (
      <p>
        <img src={icons9} alt="" />
      </p>
    );
  }
  if (name === '10-finder') {
    return (
      <p>
        <img src={icons10} alt="" />
      </p>
    );
  }
  if (name === '11-github') {
    return (
      <p>
        <img src={icons11} alt="" />
      </p>
    );
  }
};
