import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const returnBothOfWhatIPassIn = <X,Y>(a: X, b: Y):{a:X,b:Y} => {
  return {
    a,
    b,
  };
};

it("Should return an object of the arguments you pass", () => {
  const result = returnBothOfWhatIPassIn("a", 1);

  expect(result).toEqual({
    a: "a",
    b: 1,
  });

  type test1 = Expect<
    Equal<
      typeof result,
      {
        a: string;
        b: number;
      }
    >
  >;
});
