import { MDXProvider as MDXProviderComponent } from '@mdx-js/react';
import { MDXComponents } from 'mdx/types';
import React from 'react';

import { A } from '##/typography/A';
import { Blockquote } from '##/typography/Blockquote';
import { Br } from '##/typography/Br';
import { Code } from '##/typography/Code';
import { Em } from '##/typography/Em';
import { H1 } from '##/typography/H1';
import { H2 } from '##/typography/H2';
import { H3 } from '##/typography/H3';
import { H4 } from '##/typography/H4';
import { H5 } from '##/typography/H5';
import { H6 } from '##/typography/H6';
import { Hr } from '##/typography/Hr';
import { Img } from '##/typography/Img';
import { Li } from '##/typography/Li';
import { Ol } from '##/typography/Ol';
import { P } from '##/typography/P';
import { Pre } from '##/typography/Pre';
import { Strong } from '##/typography/Strong';
import { Ul } from '##/typography/Ul';

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
} as MDXComponents;

type Props = {
  disableParentContext?: boolean;
  children?: React.ReactNode;
};

export const MDXProvider = (props: Props) => (
  <MDXProviderComponent {...props} components={components} />
);
