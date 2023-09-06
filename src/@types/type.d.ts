/**
 * 将联合类型转为对应的交叉函数类型
 * @template U 联合类型
 */
type UnionToInterFunction<U> = (
  U extends any ? (k: () => U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * 获取联合类型中的最后一个类型
 * @template U 联合类型
 */
type GetUnionLast<U> = UnionToInterFunction<U> extends { (): infer A }
  ? A
  : never;

/**
 * 在元组类型中前置插入一个新的类型（元素）；
 * @template Tuple 元组类型
 * @template E 新的类型
 */
type Prepend<Tuple extends any[], E> = [E, ...Tuple];

/**
 * 联合类型转元组类型；
 * @template Union 联合类型
 * @template T 初始元组类型
 * @template Last 传入联合类型中的最后一个类型（元素），自动生成，内部使用
 */
type UnionToTuple<Union, T extends any[] = [], Last = GetUnionLast<Union>> = {
  0: T;
  1: UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>;
}[[Union] extends [never] ? 0 : 1];

// * 联合类型转数组类型；
type Union2Array<T> = [T, ...T[]];

// 取出所有的可选类型
type NullableKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

// 取出object中的所有key变为可选
type KeysDeep<T> = T extends object
  ? {
      [K in keyof T]-?:
        | K
        | (T[K] extends (infer A)[] ? KeysDeep<A> : KeysDeep<T[K]>);
    }[keyof T]
  : never;

// record 的 可选方法
type RecordPartial<K extends keyof any, T> = {
  [P in K]?: T;
};
type NonNullable<T> = T extends null | undefined ? never : T;
type NoUndefined<T> = T extends undefined ? never : T;
