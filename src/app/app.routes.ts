import { Route, Routes } from '@angular/router';
import { ObservedValueOf, of } from 'rxjs';

type PrimitiveType<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends null
  ? null
  : T extends undefined
  ? undefined
  : never;

type ExtractRouterInputs<TRoutes extends readonly Route[]> =
  TRoutes extends readonly (infer TRoute)[]
    ? {
        [Key in keyof TRoute as Key extends 'path'
          ? TRoute[Key] extends `:${infer TPath}`
            ? TPath
            : never
          : never]: string;
      } & {
        [Key in keyof TRoute as Key extends 'data'
          ? keyof TRoute[Key]
          : never]: PrimitiveType<TRoute[Key][keyof TRoute[Key]]>;
      } & {
        [Key in keyof TRoute as Key extends 'resolve'
          ? keyof TRoute[Key]
          : never]: TRoute[Key][keyof TRoute[Key]] extends (
          ...args: any[]
        ) => infer TResolve
          ? ObservedValueOf<TResolve>
          : never;
      }
    : never;

type ExtractWritableRouterInput<TRoutes extends readonly Route[]> = {
  -readonly [Key in keyof ExtractRouterInputs<TRoutes>]: ExtractRouterInputs<TRoutes>[Key];
};

const _routes = [
  {
    path: ':id',
    data: { test2: 456 },
    resolve: { test3: () => of<boolean | null>(false) },
    loadComponent: () => import('./test.component'),
  },
] as const;

export const routes = _routes as unknown as Routes;

export type AppRouterInputs = ExtractWritableRouterInput<typeof _routes>;
