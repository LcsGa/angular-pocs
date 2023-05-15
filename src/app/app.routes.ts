import { Routes } from '@angular/router';
import { ObservedValueOf, of } from 'rxjs';

type _ExtractRouterInputs<TRoutes extends Routes> =
  TRoutes extends (infer TRoute)[]
    ? {
        [Key in keyof TRoute as Key extends 'path'
          ? TRoute[Key] extends `${string}:${infer TPath}`
            ? TPath
            : never
          : never]: string;
      } & {
        [Key in keyof TRoute as Key extends 'data'
          ? keyof TRoute[Key]
          : never]: TRoute[Key][keyof TRoute[Key]];
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

type ExtractRouterInputs<TRoutes extends Routes> = {
  [Key in keyof _ExtractRouterInputs<TRoutes>]: _ExtractRouterInputs<TRoutes>[Key];
};

export const routes = [
  {
    path: ':id' as const,
    data: { test2: 456 },
    resolve: { test3: () => of<boolean | null>(false) },
    loadComponent: () => import('./test.component'),
  },
] satisfies Routes;

export type AppRouterInputs = ExtractRouterInputs<typeof routes>;
