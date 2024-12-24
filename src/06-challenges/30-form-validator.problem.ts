import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type Validator<TValue> = (value: TValue) => string | undefined;
type Config<TFields> = {
  [key in keyof TFields]: Array<keyof typeof validators>;
};
type Values<TFields> = {
  [key in keyof TFields]: any;
};
type Errors<TFields> = {
  [key in keyof TFields]?: string;
};
//  esta solución es errónea
const makeFormValidatorFactory = <TObj extends object>(
  validators: { [key: string]: Validator<any> } // The set of validators
) => {
  return <TFields extends object>(config: Config<TFields>) => {
    return (values: Values<TFields>): Errors<TFields> => {
      const errors: Errors<TFields> = {};

      for (const key in config) {
        for (const validatorName of config[key]) {
          const validator = validators[validatorName];
          const error = validator(values[key as keyof TFields]);
          if (error) {
            errors[key as keyof TFields] = error;
            break; // Stop at the first error for this field
          }
        }
      }

      return errors;
    };
  };
};


const createFormValidator = makeFormValidatorFactory({
  required: (value) => {
    if (value === "") {
      return "Required";
    }
  },
  minLength: (value) => {
    if (value.length < 5) {
      return "Minimum length is 5";
    }
  },
  email: (value) => {
    if (!value.includes("@")) {
      return "Invalid email";
    }
  },
});

const validateUser = createFormValidator({
  id: ["required"],
  username: ["required", "minLength"],
  email: ["required", "email"],
});

it("Should properly validate a user", () => {
  const errors = validateUser({
    id: "1",
    username: "john",
    email: "Blah",
  });

  expect(errors).toEqual({
    username: "Minimum length is 5",
    email: "Invalid email",
  });

  type test = Expect<
    Equal<
      typeof errors,
      {
        id: string | undefined;
        username: string | undefined;
        email: string | undefined;
      }
    >
  >;
});

it("Should not allow you to specify a validator that does not exist", () => {
  createFormValidator({
    // @ts-expect-error
    id: ["i-do-not-exist"],
  });
});

it("Should not allow you to validate an object property that does not exist", () => {
  const validator = createFormValidator({
    id: ["required"],
  });

  validator({
    // @ts-expect-error
    name: "123",
  });
});
