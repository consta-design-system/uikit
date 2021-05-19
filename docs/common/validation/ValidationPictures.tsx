import React from 'react';

import Flow1 from './Examples/flow-1.svg';
import Flow2 from './Examples/flow-2.svg';
import Flow3 from './Examples/flow-3.svg';
import Flow4 from './Examples/flow-4.svg';
import Flow5 from './Examples/flow-5.svg';
import Flow6 from './Examples/flow-6.svg';
import Flow7 from './Examples/flow-7.svg';
import Help1 from './Examples/help-1.svg';
import Help2 from './Examples/help-2.svg';
import LooseFocus1 from './Examples/loose-focus-1.svg';
import LooseFocus2 from './Examples/loose-focus-2.svg';
import Tooltip1 from './Examples/tooltip-1.svg';

export const ValidationPictures = ({ name }) => {
  if (name === 'loose-focus-1') {
    return (
      <p>
        <img src={LooseFocus1} alt="" />
      </p>
    );
  }
  if (name === 'loose-focus-2') {
    return (
      <p>
        <img src={LooseFocus2} alt="" />
      </p>
    );
  }
  if (name === 'tooltip-1') {
    return (
      <p>
        <img src={Tooltip1} alt="" />
      </p>
    );
  }
  if (name === 'help-1') {
    return (
      <p>
        <img src={Help1} alt="" />
      </p>
    );
  }
  if (name === 'help-2') {
    return (
      <p>
        <img src={Help2} alt="" />
      </p>
    );
  }
  if (name === 'flow-1') {
    return (
      <p>
        <img src={Flow1} alt="" />
      </p>
    );
  }
  if (name === 'flow-2') {
    return (
      <p>
        <img src={Flow2} alt="" />
      </p>
    );
  }
  if (name === 'flow-3') {
    return (
      <p>
        <img src={Flow3} alt="" />
      </p>
    );
  }
  if (name === 'flow-4') {
    return (
      <p>
        <img src={Flow4} alt="" />
      </p>
    );
  }
  if (name === 'flow-5') {
    return (
      <p>
        <img src={Flow5} alt="" />
      </p>
    );
  }
  if (name === 'flow-6') {
    return (
      <p>
        <img src={Flow6} alt="" />
      </p>
    );
  }
  if (name === 'flow-7') {
    return (
      <p>
        <img src={Flow7} alt="" />
      </p>
    );
  }
};
