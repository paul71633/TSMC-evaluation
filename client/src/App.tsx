import { useEffect, useRef, useState } from 'react'
import AddTodo from './components/AddTodo'
import TodoItem from './components/TodoItem'
import { Todo } from './interfaces/Todo.interface'

const App = () => {

  const [backendData, setBackendData] = useState<Todo[]>([]);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [sortData, setSortData] = useState<boolean>(false);
  const isSorted = useRef(false);

  const sortTasks = (data: Todo[]) => {
    data = data.sort((t1, t2) => {
      if (t1.priority > t2.priority) {
          return 1;
      } else if (t1.priority < t2.priority) {
          return -1;
      }
      return 0;
    });
  }

  useEffect(() => {
    if (isSorted.current) {
      fetch("/api/todos").then(
        response => response.json()
      ).then(data => {
        if (sortData) {
          sortTasks(data.todos);
        }
        setBackendData(data.todos);
      })
    } else {
      isSorted.current = true;
    }
  }, [dataUpdate, sortData])


  return (
    <div>
      <h1>My Todo List</h1>
      <AddTodo dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} />
      {backendData ? <TodoItem backendData={backendData} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}
                      sortData={sortData} setSortData={setSortData} />
        : <h3>Nothing Yet...</h3>}
    </div>
  )
}

export default App