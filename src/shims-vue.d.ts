declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface Window{
  $message: any
  h5sdk:any
  tt:any
  initTableTabEvent:(...args:any)=>void
}
declare interface Element{
  dataset:{
    id:string
  }
}
declare module 'lodash-es'
declare module 'animate.css'
declare module 'mockjs'
declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare interface EventTarget {
  name:string
}