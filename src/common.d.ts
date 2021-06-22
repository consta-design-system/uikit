/* eslint-disable import/export */
declare module '*.docs.mdx' {
  const MDXComponent: (props: any) => JSX.Element;

  export default MDXComponent;
}

declare module '*.jpeg' {
  const content: string;

  export default content;
}
