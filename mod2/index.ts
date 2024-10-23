import { Foo } from "mod1";

export const createFoo = (foo: string): Foo => ({ foo });

export type * from "mod1";
