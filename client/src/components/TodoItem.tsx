import React, { useState } from "react";
import { Todo } from "../interfaces/Todo.interface";
import styled from 'styled-components';

interface Props {
    backendData: Todo[];
    dataUpdate: boolean;
    setDataUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    sortData: boolean;
    setSortData: React.Dispatch<React.SetStateAction<boolean>>;
}

interface todoID {
    id: string;
}

interface todoCompleted {
    id: string;
    completed: boolean;
}

interface todoEdit {
    id: string;
    name: string;
}

const TodoItem: React.FC<Props> = ({ backendData, dataUpdate, setDataUpdate, sortData, setSortData }) => {
    const [editButtonClicked, setEditButtonClicked] = useState<boolean>(false);

    const patchTodo = (data: todoCompleted) => {
        fetch(`/api/todos/${data.id}`, 
        {method: "PATCH", 
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(data)
        }).then(response => console.log("Response", response))
        .catch(error => {console.log("Error", error)})
    }

    const patchEdit = (data: todoEdit) => {
        fetch(`/api/todos/edit/${data.id}`, 
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

    const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
        setEditButtonClicked(true);
        const textInput = document.getElementById(e.currentTarget.id.replace("edit", "") + "textInput") as HTMLInputElement;
        textInput.style.display = "block";
    }

    const handleSave = (e: React.MouseEvent<HTMLElement>) => {
        const text = document.getElementById(e.currentTarget.id.replace("save", "") + "text");
        const textInput = document.getElementById(e.currentTarget.id.replace("save", "") + "textInput") as HTMLInputElement;
        textInput.style.display = "none";
        if (text) {
            text.innerHTML = textInput.value;
        }
        const patchData = {id: e.currentTarget.id, name: textInput.value};
        patchEdit(patchData);
        setDataUpdate(!dataUpdate);
        setEditButtonClicked(false);
    }

    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        const deleteData = {id: e.currentTarget.id};
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

    const sortTasks = () => {
        setSortData(!sortData);
    }

    return (
        <>
            <StyledButton onClick={sortTasks} style={{ background: "gold" }}>
                Sort Tasks By Priority
            </StyledButton>
            <StyledButton onClick={handleDeleteAll} style={{ marginLeft: "10px", background: "red", color: "white" }}>
                Delete All Tasks
            </StyledButton>
            <div>
                {backendData.map((todo: Todo) =>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <input type="checkbox" id={todo.id} onChange={e => handleCheck(e)} checked={todo.completed} />
                        <h3 id={todo.id + "text"} style={{ marginLeft: "10px" }}>
                            {todo.name}
                        </h3>
                        <input id={todo.id + "textInput"} defaultValue={`${todo.name}`} style={{ display: "none", marginLeft: "10px" }}/>
                        {!editButtonClicked ? (
                            <StyledIndividualButton id={todo.id + "edit"} onClick={e => handleEdit(e)} >
                                EDIT
                            </StyledIndividualButton>) : (
                            <StyledIndividualButton id={todo.id + "save"} onClick={e => handleSave(e)} >
                                SAVE
                            </StyledIndividualButton>
                        )}
                        <StyledIndividualButton id={todo.id} onClick={handleDelete} 
                        style={{ background: "red", color: "white" }}>
                            DELETE
                        </StyledIndividualButton>
                    </div>
                )}
            </div>
        </>
    )
}

const StyledButton = styled.button`
    width: 17%;
    height: 30px;
    margin-top: 20px;
    font-weight: bold;
    font-size: 16px;
`;

const StyledIndividualButton = styled.button`
    margin-left: 10px;
    height: 50%;
`;

export default TodoItem;