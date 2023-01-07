import { useEffect, useRef, useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import { Todo } from './interfaces/Todo.interface';
import { sortTasksByPriority, sortTasksByTime } from './components/api';

const App = () => {

  const [backendData, setBackendData] = useState<Todo[]>([]);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [sortDataByPriority, setSortDataByPriority] = useState<boolean>(false);
  const [sortDataByTime, setSortDataByTime] = useState<boolean>(false);
  const isSorted = useRef(false);

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
      {backendData.length > 0 ? <TodoItem backendData={backendData} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}
                      sortDataByPriority={sortDataByPriority} setSortDataByPriority={setSortDataByPriority}
                      sortDataByTime={sortDataByTime} setSortDataByTime={setSortDataByTime} />
        : <h3>Nothing Yet...</h3>}
    </div>
  )
}

export default App;