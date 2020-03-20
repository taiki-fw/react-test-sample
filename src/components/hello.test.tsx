import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import shaping from "pretty";

import Hello from "./hello";

let container: Element;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it("renders with or without name", () => {
  act(() => {
    render(<Hello />, container);
  });
  expect(container.textContent).toBe("Hey, stranger");
  expect(shaping(container.innerHTML)).toMatchInlineSnapshot(
    `"<span>Hey, stranger</span>"`
  );

  act(() => {
    // containerに別のコンポーネントをレンダーしている。
    render(<Hello name="Jenny" />, container);
  });
  expect(container.textContent).toBe("Hello, Jenny!");
  expect(shaping(container.innerHTML)).toMatchInlineSnapshot(
    `"<h1>Hello, Jenny!</h1>"`
  );

  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(container.textContent).toBe("Hello, Margaret!");
  expect(shaping(container.innerHTML)).toMatchInlineSnapshot(
    `"<h1>Hello, Margaret!</h1>"`
  );
});
