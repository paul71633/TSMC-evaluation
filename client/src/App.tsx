import { useEffect, useState } from 'react'
import AddTodo from './components/AddTodo'
import TodoItem from './components/TodoItem'
import { Todo } from './interfaces/Todo.interface'

const App = () => {

  const [backendData, setBackendData] = useState<Todo[]>([])
  const [dataUpdate, setDataUpdate] = useState(false)
  console.log(backendData)
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(data => {
      setBackendData(data.todo)

    })
  }, [dataUpdate])


  return (
    <div>
      <h1>my todo list</h1>
      <AddTodo dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} />
      {backendData ? <TodoItem backendData={backendData} />
        : <h3>nothing yet...</h3>}


    </div>
  )
}

export default App