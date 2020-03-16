import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

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

act(() => {
  // render components
  /**
   * レンダー、ユーザイベント、データの取得といったタスクはユーザーインターフェイスへのインタラクションのunitである。
   * actヘルパーは上記のunitに関する更新が全て処理されていることを保証する。
   * ちなみに React Testing Library のヘルパーは act() でラップされているので冗長にならない。
   */
});
// make assertions
