// api.js


// interfaces
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

// function in AddTodo component
export const postTodo = (data: Todo) => {
   fetch("/api/post", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
   })
     .then((response) => console.log("Response", response))
     .catch((error) => {
       console.log("Error", error);
     });
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

