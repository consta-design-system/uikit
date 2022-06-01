import React from 'react';
import { MDXProvider as MDXProviderComponent } from '@mdx-js/react';
import { A } from '##/typography/A/A';
import { Blockquote } from '##/typography/Blockquote/Blockquote';
import { Br } from '##/typography/Br/Br';
import { Code } from '##/typography/Code/Code';
import { Em } from '##/typography/Em/Em';
import { H1 } from '##/typography/H1/H1';
import { H2 } from '##/typography/H2/H2';
import { H3 } from '##/typography/H3/H3';
import { H4 } from '##/typography/H4/H4';
import { H5 } from '##/typography/H5/H5';
import { H6 } from '##/typography/H6/H6';
import { Hr } from '##/typography/Hr/Hr';
import { Img } from '##/typography/Img/Img';
import { Li } from '##/typography/Li/Li';
import { Ol } from '##/typography/Ol/Ol';
import { P } from '##/typography/P/P';
import { Pre } from '##/typography/Pre/Pre';
import { Strong } from '##/typography/Strong/Strong';
import { Ul } from '##/typography/Ul/Ul';

export const components = {
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
    b: Strong,
    i: Em,
    li: Li,
    ol: Ol,
    p: P,
    pre: Pre,
    strong: Strong,
    ul: Ul,
}

type Props = {
    disableParentContext?: boolean;
    children?: React.ReactNode;
}

export const MDXProvider = (props: Props) => {
    return <MDXProviderComponent {...props} components={components} />
}