import React from "react";
import { Todo } from "../interfaces/Todo.interface"

interface Props {
    backendData: Todo[];
    dataUpdate: boolean;
    setDataUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface todoID {
    id: string;
}

interface todoCompleted {
    id: string;
    completed: boolean;
}

const TodoItem: React.FC<Props> = ({ backendData, dataUpdate, setDataUpdate }) => {
    const patchTodo = (data: todoCompleted) => {
        fetch(`/api/todos/${data.id}`, 
        {method: "PATCH", 
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(data)
        }).then(response => console.log("Response", response))
        .catch(error => {console.log("Error", error)})
    }

    const deleteTodo = (data: todoID) => {
        fetch(`/api/todos/${data.id}`, 
        {method: "DELETE", 
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(data)
        }).then(response => console.log("Response", response))
        .catch(error => {console.log("Error", error)})
    }

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked);
        const patchData = {id: e.target.id, completed: !e.target.checked};
        console.log(patchData);
        patchTodo(patchData);
        setDataUpdate(!dataUpdate);
    }

    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        const deleteData = {id: e.currentTarget.id};
        console.log(deleteData);
        deleteTodo(deleteData);
        setDataUpdate(!dataUpdate);
    }

    const handleDeleteAll = () => {
        console.log(backendData);
        for (let i = 0; i < backendData.length; i++) {
            let deleteData = {id: backendData[i].id};
            deleteTodo(deleteData);
        }
        setDataUpdate(!dataUpdate);
    }

    return (
        <>
            <button onClick={handleDeleteAll} 
             style={{ width: "20%", height: "30px", marginTop: "20px", background: "red", color: "white", fontWeight: "bold", fontSize: "16px" }}>
                Delete All Tasks
            </button>
            <div>
                {backendData.map((todo: Todo) =>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <input type="checkbox" id={todo.id} onChange={e => handleCheck(e)} checked={todo.completed} />
                        <h3 style={{ marginLeft: "10px" }}>{todo.name}</h3>
                        <button id={todo.id} onClick={handleDelete} 
                        style={{ marginLeft: "10px", height: "50%", background: "red", color: "white" }}>
                            DELETE
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default TodoItem