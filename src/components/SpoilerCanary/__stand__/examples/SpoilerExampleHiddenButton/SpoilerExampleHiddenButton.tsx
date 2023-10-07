import { Example } from '@consta/stand';
import React, { useCallback, useState } from 'react';

import { Spoiler } from '##/components/SpoilerCanary';
import { TextField, TextFieldPropOnChange } from '##/components/TextField';

export const SpoilerExampleHiddenButton = () => {
  const [lineClamp, setLineClamp] = useState(4);
  const onChange: TextFieldPropOnChange = useCallback(
    (value) => setLineClamp(Number(value)),
    [],
  );
  return (
    <Example col={1}>
      <TextField
        type="number"
        label="Максимальное количество строк"
        value={lineClamp.toString()}
        onChange={onChange}
      />
      <Spoiler lineClamp={lineClamp}>
        Проснувшись однажды утром после беспокойного сна, Грегор Замза
        обнаружил, что он у себя в постели превратился в страшное насекомое.
        Лежа на панцирнотвердой спине, он видел, стоило ему приподнять голову,
        свой коричневый, выпуклый, разделенный дугообразными чешуйками живот, на
        верхушке которого еле держалось готовое вот-вот окончательно сползти
        одеяло. Его многочисленные, убого тонкие по сравнению с остальным телом
        ножки беспомощно копошились у него перед глазами. «Что со мной
        случилось?» – подумал он.
      </Spoiler>
      <Spoiler lineClamp={lineClamp}>
        Проснувшись однажды утром после беспокойного сна, Грегор Замза
        обнаружил, что он у себя в постели превратился в страшное насекомое.
        Лежа на панцирнотвердой спине, он видел, стоило ему приподнять голову,
        свой коричневый, выпуклый, разделенный дугообразными чешуйками живот.
      </Spoiler>
    </Example>
  );
};
