import React from 'react';

import icons1 from './images/1-icons-grid.svg';
import icons2 from './images/2-icons-grid.svg';
import icons3 from './images/3-icons-grid.svg';
import icons4 from './images/4-figma-union.png';
import icons5 from './images/5-icons-grid.svg';
import icons6 from './images/6-examples.svg';
import icons7 from './images/7-figma.png';
import icons8 from './images/8-github.png';
import icons9 from './images/9-figma.png';
import icons10 from './images/10-finder.png';
import icons11 from './images/11-github.png';

export const InstructionPictures = ({ name }: { name: string }) => {
  if (name === '1-icons-grid') {
    return (
      <p>
        <img src={icons1} alt="" />
      </p>
    );
  }
  if (name === '2-icons-grid') {
    return (
      <p>
        <img src={icons2} alt="" />
      </p>
    );
  }
  if (name === '3-icons-grid') {
    return (
      <p>
        <img src={icons3} alt="" />
      </p>
    );
  }
  if (name === '4-figma-union') {
    return (
      <p>
        <img src={icons4} alt="" />
      </p>
    );
  }
  if (name === '5-icons-grid') {
    return (
      <p>
        <img src={icons5} alt="" />
      </p>
    );
  }
  if (name === '6-examples') {
    return (
      <p>
        <img src={icons6} alt="" />
      </p>
    );
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
