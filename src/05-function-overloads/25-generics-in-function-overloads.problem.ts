import { it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";
function returnWhatIPassInExceptFor1(t: 1): 2;
function returnWhatIPassInExceptFor1<T>(t: T): T;
function returnWhatIPassInExceptFor1(t: unknown): unknown{
  if (t === 1) {
    return 2;
  }
  return t;
}
// esta del chatgpt no funciona
// function returnWhatIPassInExceptFor1<T>(t: T): T extends 1 ? 2 : T {
//   if (t === 1) {
//     return 2 as T extends 1 ? 2 : T; // Narrowing the return type for `1`
//   }
//   return t ; // Returning the input value as-is
// }

it("Should return the type 2 when you pass in 1", () => {
  const result = returnWhatIPassInExceptFor1(1);

  type test1 = Expect<Equal<typeof result, 2>>;
});

it("Otherwise, should return what you pass in", () => {
  const a = returnWhatIPassInExceptFor1("a");
  const b = returnWhatIPassInExceptFor1("b");
  const c = returnWhatIPassInExceptFor1("c");

  type tests = [
    Expect<Equal<typeof a, "a">>,
    Expect<Equal<typeof b, "b">>,
    Expect<Equal<typeof c, "c">>
  ];
});
