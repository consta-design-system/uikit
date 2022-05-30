import React from 'react';
import { MDXProvider as MDXProviderComponent } from '@mdx-js/react';
import { default as MDXTypes } from 'mdx/types';
import { A } from '##/componets/A/A';
import { Blockquote } from '##/componets/Blockquote/Blockquote';
import { Br } from '##/componets/Br/Br';
import { Code } from '##/componets/Code/Code';
import { Em } from '##/componets/Em/Em';
import { H1 } from '##/componets/H1/H1';
import { H2 } from '##/componets/H2/H2';
import { H3 } from '##/componets/H3/H3';
import { H4 } from '##/componets/H4/H4';
import { H5 } from '##/componets/H5/H5';
import { H6 } from '##/componets/H6/H6';
import { Hr } from '##/componets/Hr/Hr';
import { Img } from '##/componets/Img/Img';
import { Li } from '##/componets/Li/Li';
import { Ol } from '##/componets/Ol/Ol';
import { P } from '##/componets/P/P';
import { Pre } from '##/componets/Pre/Pre';
import { Strong } from '##/componets/Strong/Strong';
import { Ul } from '##/componets/Ul/Ul';

const components = {
    a: A,
    blockquote: Blockquote,
    br: Br,
    code: Code,
    em: Em,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    hr: Hr,
    img: Img,
    li: Li,
    ol: Ol,
    p: P,
    pre: Pre,
    strong: Strong,
    ul: Ul,
}

type Props = {
      components?: MDXTypes.MDXComponents | undefined;
      disableParentContext?: boolean | undefined;
      children?: React.ReactNode;
}

export const MDXProvider = (props: Props) => {
    return <MDXProviderComponent components={components} {...props} />
}