import { render, screen, getQueriesForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

import App from "../App";
import OperationButtons from "../components/OperationButtons";
import AddTodo from "../components/AddTodo";

test("AddTodo Component HTML SOURCE CODE", () => {
  const div = document.createElement("div");
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    console.log("-------AddTodo Component HTML SOURCE CODE------");
    const root = ReactDOM.createRoot(div);
    root.render(
      <React.StrictMode>
        <AddTodo />
      </React.StrictMode>
    );
  });

  console.log(div.innerHTML); // 可以 console.log 看看是不是有成功 render
  console.log("-----------------------------");
});

test("UI ===> check TITLE is 'My Todo List'", () => {
  console.log("-------START TEST UI1------");
  render(<App />);
  const TITLE = screen.getByText(/My Todo List/i);
  expect(TITLE).toBeInTheDocument();
  console.log("--------TEST UI END1------");
});

test("UI ===> check Todo input: name, priority, and submit button", () => {
  const div = document.createElement("div");
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    console.log("-------START TEST UI2------");
    const root = ReactDOM.createRoot(div);
    root.render(
      <React.StrictMode>
        <AddTodo />
      </React.StrictMode>
    );
  });

  // eslint-disable-next-line testing-library/no-node-access
  expect(div.querySelectorAll("input")[0].type).toBe("text"); // 驗證 Todo 名稱  type = "text"
  // eslint-disable-next-line testing-library/no-node-access
  expect(div.querySelectorAll("label")[0].textContent.trim()).toBe(
    "Things To Do:"
  ); // 驗證對應名稱的標題label 裡面的文字
  // eslint-disable-next-line testing-library/no-node-access
  expect(div.querySelector("select").textContent).toBe("HighAlarmingLow"); // 驗證 Todo 優先等級
  // eslint-disable-next-line testing-library/no-node-access
  expect(div.querySelectorAll("label")[1].textContent.trim()).toBe(
    "Priority Level:"
  ); // 驗證對應優先等級的標題label 裡面的文字
  // eslint-disable-next-line testing-library/no-node-access
  expect(div.querySelectorAll("input")[1].type).toBe("submit"); // 驗證 form submit button type = "submit"
  console.log("--------TEST UI END2------");
});

test("UI ===> check TodoItem Operation Button", () => {
  const div = document.createElement("div");
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    console.log("-------HTML SOURCE CODE------");
    const root = ReactDOM.createRoot(div);
    root.render(<OperationButtons />);
  });

  console.log(div.innerHTML); // 可以 console.log 看看是不是有成功 render
  console.log("-----------------------------");
});


