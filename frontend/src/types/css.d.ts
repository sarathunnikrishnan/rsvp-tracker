/**
 * TypeScript declarations for CSS side-effect imports and stylesheet modules.
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
