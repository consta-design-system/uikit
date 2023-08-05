export type Value<V extends string | string[] | readonly string[]> =
  V extends string[]
    ? Record<V[number], string>
    : V extends readonly string[]
    ? Record<V[number], string>
    : string;
