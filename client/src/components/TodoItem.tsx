import { Todo } from "../interfaces/Todo.interface"

interface Props {
    backendData: Todo[]
}

const TodoItem: React.FC<Props> = ({ backendData }) => {
    return (
        <div>
            {backendData.map((todo: Todo) =>
                <div>
                    <h3>{todo.name}</h3>
                    <button>{todo.completed ? "completed" : "uncomplete"}</button>
                </div>
            )}
        </div>
    )
}

export default TodoItem