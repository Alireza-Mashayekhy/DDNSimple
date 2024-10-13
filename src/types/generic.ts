import { FC } from "react";

export interface ClassName {
  className?: string;
}

export interface Dict<T> {
  [key: string]: T;
}

export type GenericFunction = GenericFunctionConstructor<any>;

type GenericFunctionConstructor<T> = (...args: any[]) => T;

export type GenericVoidFunction =
  GenericFunctionConstructor<void | Promise<void>>;

export type SFC<P = Record<string, unknown>> = FC<P & ClassName>;

export interface SelectOption<T = string> {
  displayName: string;
  value: T;
}

export interface SelectProps<T> {
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  // ... include other props like defaultValue, placeholder, etc.
}
