import React from 'react';

import newFont1 from './images/font-replace-pic-1.png';

export const NewFontPictures = ({ name }) => {
  if (name === '1-image') {
    return (
      <p>
        <img src={newFont1} alt="" />
      </p>
    );
  }
};
