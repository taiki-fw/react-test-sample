import { unmountComponentAtNode } from "react-dom";

/**
 * beforeEach, afterEachブロックペアを常に実行する事で副作用の範囲をそれ自身にとどまるようにする
 * afterEachは仮にテストが失敗した場合でもクリーンアップしなければならない
 */

let container: Element;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});
