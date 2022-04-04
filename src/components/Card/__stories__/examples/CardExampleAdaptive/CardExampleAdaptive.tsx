import React from 'react';

import image923 from './images/dashboard923.png';
import image1280 from './images/dashboard1280.png';
import image1440 from './images/dashboard1440.png';

export const CardExampleAdaptive = ({ name }: { name: string }) => {
  if (name === '923') {
    return (
      <p>
        <img src={image923} alt="" style={{ width: 400 }} />
      </p>
    );
  }
  if (name === '1280') {
    return (
      <p>
        <img src={image1280} alt="" style={{ width: 600 }} />
      </p>
    );
  }
  return (
    <p>
      <img src={image1440} alt="" style={{ width: 700 }} />
    </p>
  );
};
