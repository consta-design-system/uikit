import React from 'react';

import imageFile from './images/font-replace-pic-1.png';

const image = {
  src: imageFile,
  alt: 'Ошибка: файл слишком большой',
};

export const NewFontPictures = () => {
  return (
    <div>
      <img src={image.src} alt={image.alt} style={{ maxWidth: 700 }} />
    </div>
  );
};
