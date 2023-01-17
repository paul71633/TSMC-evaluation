import { Todo } from '../interfaces/Todo.interface'

interface todoID {
    id: string;
}

interface todoCompleted {
    id: string;
    completed: boolean;
    completedTime: Date;
}

interface todoEdit {
    id: string;
    name: string;
    priority: string;
}

const handleErrorCode = (error: Error) => {
  switch (error.message.substring(0, 3)) {
    case "400":
      alert("This is a bad request");
      break;
    case "401":
      alert("This is an unauthorized request");
      break;
    case "403":
      alert("You don't have access right to the content");
      break;
    case "404":
      alert("The server can't find the requested source");
      break;
    case "405":
      alert("This method is not allowed");
      break;
    case "406":
      alert("The content is not acceptable");
      break;
    case "407":
      alert("Authentication for Proxy is required");
      break;
    case "408":
      alert("Request timeout, the server would like to shut down this unused connection");
      break;
    case "409":
      alert("Request conflicts with the current state of the server");
      break;
    case "410":
      alert("Requested content has been permanantly deleted from the server");
      break;
    case "500":
      alert("There is an internal server error");
      break;
    case "501":
      alert("Request method is not supported by the server and can't be handled");
      break;
    case "502":
      alert("Server working as a gateway got an invalid response");
      break;
    case "503":
      alert("Server can't process the request due to a system overload");
      break;
    case "504":
      alert("Server didn't response within the time frame the gateway was willing to wait");
      break;
    case "505":
      alert("HTTP version used in the request is not supported by the server");
      break;
    default:
      alert(error.message);
  }
}

// function in AddTodo component
export const postTodo = (data: Todo) => {
   fetch("/api/post", 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        return response.blob();
      } else {
        console.log("Response", response);
        throw new Error(response.status.toString() + response.statusText);
      }
    })
    .catch((error) => { 
      handleErrorCode(error);
      // console.log("Error", error); 
    })
};

// functions in AddItem component
export const patchTodo = (data: todoCompleted) => {
  fetch(`/api/todos/${data.id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(response => console.log("Response", response))
    .catch(error => { console.log("Error", error) })
};

export const patchEdit = (data: todoEdit) => {
  fetch(`/api/todos/edit/${data.id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(response => console.log("Response", response))
    .catch(error => { console.log("Error", error) })
};

export const deleteTodo = (data: todoID) => {
  fetch(`/api/todos/${data.id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(response => console.log("Response", response))
    .catch(error => { console.log("Error", error) })
};

// functions in App component
export const sortTasksByPriority = (data: Todo[]) => {
  data = data.sort((t1, t2) => {
    if (t1.priority > t2.priority) {
      return 1;
    } else if (t1.priority < t2.priority) {
      return -1;
    }
    return 0;
  });
};

export const sortTasksByTime = (data: Todo[]) => {
    const completedTasks = [];
    const notCompletedTasks = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].completed) {
        completedTasks.push(data[i]);
      } else {
        notCompletedTasks.push(data[i]);
      }
    }
    const sortedCompletedTasks = completedTasks.sort((t1, t2) => {
      return new Date(t1.completedTime).getTime() - new Date(t2.completedTime).getTime();
    });
    data = data.splice(0, data.length, ...sortedCompletedTasks.concat(notCompletedTasks));
};

