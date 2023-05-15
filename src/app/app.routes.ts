import { Route, Routes } from '@angular/router';
import { ObservedValueOf, of } from 'rxjs';

type _ExtractRouterInputs<T extends Route> = T extends infer TRoute
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

type ExtractRouterInputs<T extends Route> = {
  [Key in keyof _ExtractRouterInputs<T>]: _ExtractRouterInputs<T>[Key];
};

const testRoute = {
  path: ':id' as const,
  data: { test2: 456 },
  resolve: { test3: () => of<boolean | null>(false) },
  loadComponent: () => import('./test.component'),
} satisfies Route;

export const routes: Routes = [testRoute];

export type TestRouterInputs = ExtractRouterInputs<typeof testRoute>;
