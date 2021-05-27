declare module '*.docs.mdx' {
  const MDXComponent: (props: any) => JSX.Element;
  // eslint-disable-next-line import/export
  export default MDXComponent;
}

declare module '*.jpeg' {
  const content: string;
  // eslint-disable-next-line import/export
  export default content;
}
