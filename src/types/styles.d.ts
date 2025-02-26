declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.webp" {
  const value: string;
  export default value;
}