import {
  VNodeProps,
  VNode,
  RendererNode,
  RendererElement,
  DefineComponent,
} from "vue";

type Props =
  | (VNodeProps & {
      [key: string]: any;
    })
  | null;

// maybe this can be typed as `SetupContext`
type Context = {
  props: any;
  attrs: any;
  slots: any;
  emit: any;
  expose: (exposed?: any) => void;
};

type ComponentReturn = VNode<RendererNode, RendererElement, Props> & {
  __ctx?: Context;
};

export type PseudoComponent<
  T extends (...args: any[]) => ComponentReturn,
  PseudoReturnType extends ComponentReturn = ReturnType<T>,
  PseudoContext extends ComponentReturn["__ctx"] = PseudoReturnType["__ctx"],
  PseudoProps = NoUndefined<PseudoContext>["props"],
  PseudoExposed = Parameters<NoUndefined<PseudoContext>["expose"]>[0]
> = DefineComponent<PseudoProps, PseudoExposed>;
