declare module '*.docs.mdx' {
  const MDXComponent: (props: any) => JSX.Element;

  export default MDXComponent;
}

declare module '*.jpeg' {
  const content: string;

  export default content;
}

declare module '*.jpg' {
  const content: string;

  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}
