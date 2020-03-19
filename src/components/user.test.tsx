import * as React from "react";
import * as ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import customGlobal from "../setupTests";
import User from "./user";

function Test() {
  return null;
}

let container = document.createElement("div");
beforeEach(() => {
  // setup a DOM element as a render target
  document.body.appendChild(container);
  fetchMock.resetMocks();
});

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
});

it("render user data", async () => {
  const fakeUser = {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue"
  };

  customGlobal.fetchMock.mockResponseOnce(JSON.stringify({ ...fakeUser }));

  await act(async () => {
    ReactDOM.render(<User id="123" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  global.fetch.mockRestore();
});
