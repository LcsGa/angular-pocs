import { Route, Routes } from '@angular/router';
import { ObservedValueOf, of } from 'rxjs';

type _ExtractRouterInputs<TRoutes extends Route[]> =
  TRoutes extends (infer TRoute)[]
    ? {
        [Key in keyof TRoute as Key extends 'path'
          ? TRoute[Key] extends `:${infer TPath}`
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

type ExtractRouterInputs<TRoutes extends Route[]> = {
  [Key in keyof _ExtractRouterInputs<TRoutes>]: _ExtractRouterInputs<TRoutes>[Key];
};

const _routes = [
  {
    path: ':id' as const,
    data: { test2: 456 },
    resolve: { test3: () => of<boolean | null>(false) },
    loadComponent: () => import('./test.component'),
  },
];

export const routes = _routes as unknown as Routes;

export type AppRouterInputs = ExtractRouterInputs<typeof _routes>;
