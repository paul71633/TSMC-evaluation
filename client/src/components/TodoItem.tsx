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
    priority: string;
}

const TodoItem: React.FC<Props> = ({ backendData, dataUpdate, setDataUpdate, sortData, setSortData }) => {
    const [editButtonClicked, setEditButtonClicked] = useState<boolean>(false);
    const [editID, setEditID] = useState<number[]>([]);
    const [priorityLevel, setPriorityLevel] = useState<string>("high");

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
        const targetID = e.currentTarget.id;
        const regEx = /edit[0-9A-Za-z]+/;
        const textInput = document.getElementById(targetID.replace(regEx, "") + "textInput") as HTMLInputElement;
        const selectPriority = document.getElementById(targetID.replace(regEx, "") + "priority") as HTMLSelectElement;
        setEditID(editID => [...editID, parseInt(targetID.replace(regEx, ""))]);
        textInput.style.display = "block";
        selectPriority.style.display = "block";
    }

    const handleSave = (e: React.MouseEvent<HTMLElement>) => {
        const targetID = e.currentTarget.id;
        const regEx = /save[0-9A-Za-z]+/;
        const text = document.getElementById(targetID.replace(regEx, "") + "text");
        const textInput = document.getElementById(targetID.replace(regEx, "") + "textInput") as HTMLInputElement;
        const selectPriority = document.getElementById(targetID.replace(regEx, "") + "priority") as HTMLSelectElement;
        textInput.style.display = "none";
        selectPriority.style.display = "none";
        if (text) {
            text.innerHTML = textInput.value;
        }
        const patchData = {id: targetID.replace(/[0-9]+save/, ""), name: textInput.value, priority: selectPriority.value};
        patchEdit(patchData);
        setDataUpdate(!dataUpdate);
        setEditID(editID.filter(id => id !== parseInt(targetID.replace(regEx, ""))));
        if (editID.length === 0) {
            setEditButtonClicked(false);
        }
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

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPriorityLevel(value);
    };

    return (
        <>
            <StyledButton onClick={sortTasks} style={{ background: "gold" }}>
                Sort Tasks By Priority
            </StyledButton>
            <StyledButton onClick={handleDeleteAll} style={{ marginLeft: "10px", background: "red", color: "white" }}>
                Delete All Tasks
            </StyledButton>
            <div>
                {backendData.map((todo: Todo, index: number) =>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <input type="checkbox" id={todo.id} onChange={e => handleCheck(e)} checked={todo.completed} />
                        <h3 id={index.toString() + "text"} style={{ marginLeft: "10px" }}>
                            {todo.name}
                        </h3>
                        <input id={index.toString() + "textInput"} defaultValue={`${todo.name}`} style={{ display: "none", marginLeft: "10px" }}/>
                        <select id={index.toString() + "priority"} value={priorityLevel} onChange={selectChange} style={{ display: "none", marginLeft: "10px" }}>
                            <option value="High">High</option>
                            <option value="Alarming">Alarming</option>
                            <option value="Low">Low</option>
                        </select>
                        {editButtonClicked && editID.includes(index) ? (
                            <StyledIndividualButton id={index.toString() + "save" + todo.id} onClick={e => handleSave(e)} >
                                SAVE
                            </StyledIndividualButton>) : (
                            <StyledIndividualButton id={index.toString() + "edit" + todo.id} onClick={e => handleEdit(e)} >
                                EDIT
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