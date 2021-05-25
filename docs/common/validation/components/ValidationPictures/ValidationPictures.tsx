import React from 'react';

import flow1 from './images/flow-1.svg';
import flow2 from './images/flow-2.svg';
import flow3 from './images/flow-3.svg';
import flow4 from './images/flow-4.svg';
import flow5 from './images/flow-5.svg';
import flow6 from './images/flow-6.svg';
import flow7 from './images/flow-7.svg';
import help1 from './images/help-1.svg';
import help2 from './images/help-2.svg';
import looseFocus1 from './images/loose-focus-1.svg';
import looseFocus2 from './images/loose-focus-2.svg';
import tooltip1 from './images/tooltip-1.svg';

export const ValidationPictures = ({ name }: { name: string }) => {
  if (name === 'loose-focus-1') {
    return (
      <p>
        <img src={looseFocus1} alt="" />
      </p>
    );
  }
  if (name === 'loose-focus-2') {
    return (
      <p>
        <img src={looseFocus2} alt="" />
      </p>
    );
  }
  if (name === 'tooltip-1') {
    return (
      <p>
        <img src={tooltip1} alt="" />
      </p>
    );
  }
  if (name === 'help-1') {
    return (
      <p>
        <img src={help1} alt="" />
      </p>
    );
  }
  if (name === 'help-2') {
    return (
      <p>
        <img src={help2} alt="" />
      </p>
    );
  }
  if (name === 'flow-1') {
    return (
      <p>
        <img src={flow1} alt="" />
      </p>
    );
  }
  if (name === 'flow-2') {
    return (
      <p>
        <img src={flow2} alt="" />
      </p>
    );
  }
  if (name === 'flow-3') {
    return (
      <p>
        <img src={flow3} alt="" />
      </p>
    );
  }
  if (name === 'flow-4') {
    return (
      <p>
        <img src={flow4} alt="" />
      </p>
    );
  }
  if (name === 'flow-5') {
    return (
      <p>
        <img src={flow5} alt="" />
      </p>
    );
  }
  if (name === 'flow-6') {
    return (
      <p>
        <img src={flow6} alt="" />
      </p>
    );
  }
  if (name === 'flow-7') {
    return (
      <p>
        <img src={flow7} alt="" />
      </p>
    );
  }
};
