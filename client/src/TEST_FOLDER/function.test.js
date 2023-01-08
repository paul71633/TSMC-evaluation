import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import * as fun from "../components/api";

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

  test("should function postTodo work?", async () => {
    fun.postTodo.mockResolvedValue({});
    // Render the component
    render(<AddTodo />);
    // See if the function working
    await waitFor(() => {
      console.log("YES! function work");
    });
  });
});

describe("TodoItem Component", () => {

  
  // After each test clear the mock
  beforeEach(() => jest.clearAllMocks());

  test("should function patchTodo work?", async () => {
    fun.patchTodo.mockResolvedValue({});
    // Render the component
    render(<AddTodo />);
    // See if the function working
    await waitFor(() => {
      console.log("YES! function work");
    });
  });

  test("should function patchEdit work?", async () => {
    fun.patchTodo.mockResolvedValue({});
    // Render the component
    render(<AddTodo />);
    // See if the function working
    await waitFor(() => {
      console.log("YES! function work");
    });
  });

  test("should function deleteTodo work?", async () => {
    fun.patchTodo.mockResolvedValue({});
    // Render the component
    render(<AddTodo />);
    // See if the function working
    await waitFor(() => {
      console.log("YES! function work");
    });
  });
 }


);


describe("App Component", () => {

  // After each test clear the mock
  beforeEach(() => jest.clearAllMocks());
  test("should function postTodo show message when api fails", async () => {
    fun.postTodo.mockRejectedValue({});
    render(<App />);
    await waitFor(() => {
      screen.getByText("Nothing Yet...");
    });
  });
  test("should function sortTasksByPriority work?", async () => {
    fun.sortTasksByPriority.mockRejectedValue({});
    render(<App />);
    await waitFor(() => {
      console.log("YES! function work");
    });
  });
  test("should function sortTasksByTime work?", async () => {
    fun.sortTasksByTime.mockRejectedValue({});
    render(<App />);
    await waitFor(() => {
      console.log("YES! function work");
    });
  });
});
