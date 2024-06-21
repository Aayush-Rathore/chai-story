// src/mdx.d.ts
/// <reference types="react" />

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
