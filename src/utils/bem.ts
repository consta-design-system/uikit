import { withNaming } from '@bem-react/classname';
import { BemMods, block } from 'bem-cn';

export const cn = withNaming({ e: '-', m: '_', v: '_' });

// bem-cn в вызовах вида b('my-element') возвращает не строку, а объект с методом toString.
// React начиная с 16 версии перестал вызывать на атрибуте className метод toString.
// Из-за этого в снапшотах вместо строки выводился объект с кучей разных методов.
// Нам для работы не нужны хитрые методы bem-cn типа has, is и прочих.
// Эта обёртка похожа на https://github.com/mistakster/bem-cn-lite,
// но она типизирована и работает с последней версией bem-cn.
export default (blockName: string) => {
  const b = block(blockName);

  return (
    elemNameOrBlockMods?: string | BemMods,
    elemModsOrMixins?: BemMods | string,
    mixins?: string,
  ): string => {
    if (elemNameOrBlockMods && elemModsOrMixins && mixins) {
      // b('my-element-name', {my: 'modifier'}, 'my other mixin classes')
      return b(elemNameOrBlockMods, elemModsOrMixins)
        .mix(mixins)
        .toString();
    }

    if (elemNameOrBlockMods && elemModsOrMixins) {
      if (typeof elemNameOrBlockMods === 'string') {
        // b('my-element-name', {my: 'modifier'})
        return b(elemNameOrBlockMods, elemModsOrMixins).toString();
      }
      // b({my: 'modifier'}, 'my other mixin classes')
      return b(elemNameOrBlockMods)
        .mix(elemModsOrMixins)
        .toString();
    }

    if (elemNameOrBlockMods) {
      // b('my-element-name') или b({my: 'modifier'})
      return b(elemNameOrBlockMods).toString();
    }

    // b()
    return b();
  };
};
