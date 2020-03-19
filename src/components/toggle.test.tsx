import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Toggle from "./toggle";

let container = document.createElement("div");
beforeEach(() => {
  // container *must* be attached to document so events work correctly.
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

it("changes value when clicked", () => {
  const onChange = jest.fn();

  act(() => {
    render(<Toggle onChange={onChange} />, container);
  });

  const button = document.querySelector("[data-testid=toggle]");
  expect(button?.textContent).toBe("Turn on");

  act(() => {
    button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button?.textContent).toBe("Turn off");

  act(() => {
    for (let i = 0; i < 5; i++) {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button?.textContent).toBe("Turn on");
});
