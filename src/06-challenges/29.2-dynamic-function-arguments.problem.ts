import { it } from "vitest";

interface Events {
  click: {
    x: number;
    y: number;
  };
  focus: undefined;
}

// // Function overloads
// function sendEvent(event: "click", args: { x: number; y: number }): void;
// function sendEvent(event: "focus", args?: undefined): void;
// function sendEvent(event: keyof Events, args?: { x: number; y: number }): void {
//   // Send the event somewhere!
//   console.log("Event sent:", event, args);
//   return
// }

export const sendEvent = <TEventKey extends keyof Events>(
  event: TEventKey,
  ...args: Events[TEventKey] extends undefined
    ? []
    : [payload: Events[TEventKey]]
) => {
  // Send the event somewhere!
};


it("Should force you to pass a second argument when you choose an event with a payload", () => {
  // @ts-expect-error
  sendEvent("click");

  sendEvent("click", {
    // @ts-expect-error
    x: "oh dear",
  });

  sendEvent(
    "click",
    // @ts-expect-error
    {
      y: 1,
    }
  );

  sendEvent("click", {
    x: 1,
    y: 2,
  });
});

it("Should prevent you from passing a second argument when you choose an event without a payload", () => {
  sendEvent("focus");

  sendEvent(
    "focus",
    // @ts-expect-error
    {}
  );
});
