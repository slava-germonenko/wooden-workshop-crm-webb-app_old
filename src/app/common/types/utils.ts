export type None = null | undefined;

export type NotFunction<T> = Exclude<T, Function>;
