import { useEffect, useState } from 'react'
import AddTodo from './components/AddTodo'
import TodoItem from './components/TodoItem'
import { Todo } from './interfaces/Todo.interface'

const App = () => {

  const [backendData, setBackendData] = useState<Todo[]>([])
  const [dataUpdate, setDataUpdate] = useState(false)
  console.log(backendData)
  useEffect(() => {
    fetch("/api/todos").then(
      response => response.json()
    ).then(data => {
      setBackendData(data.todos)

    })
  }, [dataUpdate])


  return (
    <div>
      <h1>my todo list</h1>
      <AddTodo dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} />
      {backendData ? <TodoItem backendData={backendData} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} />
        : <h3>nothing yet...</h3>}


    </div>
  )
}

export default App