import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * This time, let's try and solve this one
 * with function overloads too!
 */
// INFO: y parece que no podemos hacerlo con consts como se nos pone la primera función del ejemplo
// export const youSayGoodbyeISayHello = (greeting:'hello'):'goodbye';
// export const youSayGoodbyeISayHello = (greeting: "goodbye" | "hello") => {
//   return greeting === "goodbye" ? "hello" : "goodbye";
// };
function youSayGoodbyeISayHello(greeting:'hello'):'goodbye';
function youSayGoodbyeISayHello(greeting:'goodbye'):'hello';
function youSayGoodbyeISayHello(greeting: "goodbye" | "hello") {
  return greeting === "goodbye" ? "hello" : "goodbye";
};

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello");

  type test = [Expect<Equal<typeof result, "goodbye">>];

  expect(result).toEqual("goodbye");
});

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye");

  type test = [Expect<Equal<typeof result, "hello">>];

  expect(result).toEqual("hello");
});
