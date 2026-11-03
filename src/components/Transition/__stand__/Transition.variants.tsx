// @ts-nocheck

import { knobBoolean, knobNumber, knobSelect, knobText } from '@consta/stand';
import { reatomFactoryComponent } from '@reatom/react';
import React, { useRef, useState } from 'react';

export default reatomFactoryComponent(() => {
  const value1 = knobNumber('value1', 1);
  const value2 = knobSelect('value2', ['sss', 'ddd', 'fff'], 'sss');
  const value3 = knobText('value3', 'sss');
  const value4 = knobBoolean('value4', false);
  const value5 = knobBoolean('value5', false, value4);

  return () => {
    console.log('render v');
    return <div>{value3()}</div>;
  };
});
