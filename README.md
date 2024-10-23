## To repro:

Run:

```bash
pnpm install
pnpm build
```

Package `mod3` produces an invalid type declaration file:

```typescript
export declare const getFoo: () => import("mod1").Foo;
//# sourceMappingURL=index.d.ts.map
```

Despite not depending on `mod1`, its types import from it. Since `mod2` re-exports `mod1`s types, and since `mod3` depends on `mod2`, compiling `mod3` should produce this:

```typescript
export declare const getFoo: () => import("mod2").Foo;
//# sourceMappingURL=index.d.ts.map
```

```diff
-export declare const getFoo: () => import("mod1").Foo;
+export declare const getFoo: () => import("mod2").Foo;
 //# sourceMappingURL=index.d.ts.map
```

Because `mod3` has an invalid `index.d.ts`, `mod4` fails compilation when doing a lib check of `mod3`'s type declaration files.
