import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import AddTodo from "../components/AddTodo";
import * as fun from "../components/api";
import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import TodoItem from "../components/TodoItem";

/**
 * Mock the api module so that we can inject
 * the desired behavior into "postTodo"
 * while testing
 */
jest.mock("../components/api");

// test data
  const data = [
  { name: "test data1", id: "12fd31", priority: "High", completed: false, completedTime: new Date(8640000000000000) },
  { name: "test data2", id: "1sfdgh232", priority: "Low", completed: false, completedTime: new Date(8640000000001000)},
  { name: "test data3", id: "123hgj3", priority: "Alarming", completed: false, completedTime: new Date(8640000000002000) },
];

describe("AddTodo Component", () => {
  
  // After each test clear the mock
  beforeEach(() => jest.clearAllMocks());

  test("Does function postTodo work?", async () => {
    const div = document.createElement("div");
    const root = ReactDOM.createRoot(div);
    const testData = { name: "test data1", id: "12fd31", priority: "High", completed: false, completedTime: new Date(8640000000000000) };
    // No return value so resolved value = {}
    // fun.postTodo.mockResolvedValue({});
    fun.postTodo.mockResolvedValue(testData);
    // Render the component
    // render(<AddTodo />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      root.render(
        <React.StrictMode>
          <TodoItem />
        </React.StrictMode>
      )
    })
    // eslint-disable-next-line testing-library/no-node-access
    expect(div.querySelectorAll("h3")[-1].textContent).toBe("test data1")
    // See if the function works
    // await waitFor(() => {
    //   console.log("YES! function works");
    // });
  });
});

describe("TodoItem Component", () => {
  
  // After each test clear the mock
  beforeEach(() => jest.clearAllMocks());

  test("Does function patchTodo work?", async () => {
    fun.patchTodo.mockResolvedValue({});
    // Render the component
    render(<AddTodo />);
    // See if the function works
    await waitFor(() => {
      console.log("YES! function works");
    });
  });

  test("Does function patchEdit work?", async () => {
    fun.patchEdit.mockResolvedValue({});
    // Render the component
    render(<AddTodo />);
    // See if the function works
    await waitFor(() => {
      console.log("YES! function works");
    });
  });
 }
);


describe("App Component", () => {

  // After each test clear the mock
  beforeEach(() => jest.clearAllMocks());
  
  test("Does function deleteTodo work?", async () => {
    fun.deleteTodo.mockResolvedValue({});
    // Render the component
    render(<App />);
    // See if the function works
    await waitFor(() => {
      console.log("YES! function works");
    });
  });

  test("Does function sortTasksByPriority work?", async () => {
    fun.sortTasksByPriority.mockResolvedValue({});
    render(<App />);
    await waitFor(() => {
      console.log("YES! function works");
    });
  });
  test("Does function sortTasksByTime work?", async () => {
    fun.sortTasksByTime.mockResolvedValue({});
    render(<App />);
    await waitFor(() => {
      console.log("YES! function works");
    });
  });
});
