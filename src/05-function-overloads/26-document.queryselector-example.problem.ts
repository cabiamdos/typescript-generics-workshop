import { Equal, Expect } from "../helpers/type-utils";

const divElement = document.querySelector("div");
const spanElement = document.querySelector("span");

/**
 * Your challenge: figure out why divElement2 is NOT
 * of type HTMLDivElement.
 */
const divElement2 = document.querySelector<HTMLDivElement>("div.foo");
// porque es del type Element y tenemos que usar el type assertion (bueno el as HTMLDivElement es más formal)
type tests = [
  Expect<Equal<typeof divElement, HTMLDivElement | null>>,
  Expect<Equal<typeof spanElement, HTMLSpanElement | null>>,
  Expect<Equal<typeof divElement2, HTMLDivElement | null>>
];
