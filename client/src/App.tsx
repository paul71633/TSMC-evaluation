import { useEffect, useRef, useState } from 'react'
import AddTodo from './components/AddTodo'
import TodoItem from './components/TodoItem'
import { Todo } from './interfaces/Todo.interface'

const App = () => {

  const [backendData, setBackendData] = useState<Todo[]>([]);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [sortDataByPriority, setSortDataByPriority] = useState<boolean>(false);
  const [sortDataByTime, setSortDataByTime] = useState<boolean>(false);
  const isSorted = useRef(false);

  const sortTasksByPriority = (data: Todo[]) => {
    data = data.sort((t1, t2) => {
      if (t1.priority > t2.priority) {
          return 1;
      } else if (t1.priority < t2.priority) {
          return -1;
      }
      return 0;
    });
  }

  const sortTasksByTime = (data: Todo[]) => {
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
  }

  useEffect(() => {
    if (isSorted.current) {
      fetch("/api/todos").then(
        response => response.json()
      ).then(data => {
        if (sortDataByPriority) {
          sortTasksByPriority(data.todos);
        }
        if (sortDataByTime) {
          sortTasksByTime(data.todos);
        }
        setBackendData(data.todos);
      })
    } else {
      isSorted.current = true;
    }
  }, [dataUpdate, sortDataByPriority, sortDataByTime])

  return (
    <div>
      <h1>My Todo List</h1>
      <AddTodo dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} />
      {backendData ? <TodoItem backendData={backendData} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}
                      sortDataByPriority={sortDataByPriority} setSortDataByPriority={setSortDataByPriority}
                      sortDataByTime={sortDataByTime} setSortDataByTime={setSortDataByTime} />
        : <h3>Nothing Yet...</h3>}
    </div>
  )
}

export default App