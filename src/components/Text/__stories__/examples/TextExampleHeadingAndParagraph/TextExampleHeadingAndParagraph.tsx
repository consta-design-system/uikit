import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Text } from '../../../Text';

export const TextExampleHeadingAndParagraph = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <Text
        as="div"
        align="left"
        font="primary"
        lineHeight="l"
        size="2xl"
        spacing="m"
        transform="uppercase"
        view="primary"
        weight="bold"
        type="h3"
      >
        Заголовок несет суть
      </Text>
      <Text as="p" align="left" font="mono" lineHeight="s" size="s" view="primary">
        Абзац — это часть текста между отступами с новой строки. Абзац можно назвать микротекстом. В
        общей теме могут выделяться и микротемы. При этом каждый абзац раскрывает свою микротему.
        Что же ещё можно сказать про абзацы? Мы видим, что обычно в абзацах несколько предложений. И
        в таком случае каждый абзац служит для выделения своей микротемы.
      </Text>
    </div>
  );
};
