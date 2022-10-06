import React from 'react';

import { Button } from '##/components/Button/Button';

import { FileField } from '../FileField';

const Variants = () => {
  return (
    <div>
      <FileField
        id="FileField"
        onChange={() => alert('Файлы выбраны')}
        multiple
      >
        {(props) => <Button label="Выбрать файлы" {...props} />}
      </FileField>
    </div>
  );
};

export default Variants;
