import React, { useState } from "react";
import { Todo } from "../interfaces/Todo.interface";
import styled from 'styled-components';
import PriorityItems from "./PriorityItems";
import EditInput from "./EditInput";
import { deleteTodo, patchEdit, patchTodo } from "./api";
import OperationButtons from "./OperationButtons";

interface Props {
    backendData: Todo[];
    dataUpdate: boolean;
    setDataUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    sortDataByPriority: boolean;
    setSortDataByPriority: React.Dispatch<React.SetStateAction<boolean>>;
    sortDataByTime: boolean;
    setSortDataByTime: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoItem: React.FC<Props> = ({ 
    backendData, 
    dataUpdate, 
    setDataUpdate, 
    sortDataByPriority, 
    setSortDataByPriority,
    sortDataByTime, 
    setSortDataByTime }) => {
    const [editButtonClicked, setEditButtonClicked] = useState<boolean>(false);
    const [editID, setEditID] = useState<number[]>([]);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date();
        if (e.target.checked) {
            const patchDataCompleted = {id: e.target.id, completed: !e.target.checked, completedTime: date};
            patchTodo(patchDataCompleted);
        } else {
            const patchDataNotCompleted = {id: e.target.id, completed: !e.target.checked, completedTime: new Date(8640000000000000)};
            patchTodo(patchDataNotCompleted);
        }
        setDataUpdate(!dataUpdate);
    }

    const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
        setEditButtonClicked(true);
        const targetID = e.currentTarget.id;
        const regEx = /edit[0-9A-Za-z\\-]+/;
        const textInput = document.getElementById(targetID.replace(regEx, "") + "textInput") as HTMLInputElement;
        const selectPriority = document.getElementById(targetID.replace(regEx, "") + "priority") as HTMLSelectElement;
        setEditID(editID => [...editID, parseInt(targetID.replace(regEx, ""))]);
        textInput.style.display = "block";
        selectPriority.style.display = "block";
    }

    const handleSave = (e: React.MouseEvent<HTMLElement>) => {
        const targetID = e.currentTarget.id;
        const regEx = /save[0-9A-Za-z\\-]+/;
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

    return (
        <>
            <OperationButtons backendData={backendData} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}
                sortDataByPriority={sortDataByPriority} setSortDataByPriority={setSortDataByPriority}
                sortDataByTime={sortDataByTime} setSortDataByTime={setSortDataByTime}
            />
            <div>
                {backendData.map((todo: Todo, index: number) =>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <input type="checkbox" id={todo.id} onChange={e => handleCheck(e)} checked={todo.completed} />
                        <h3 id={index.toString() + "text"} style={{ marginLeft: "10px" }}>
                            {todo.name}
                        </h3>
                        <EditInput 
                            id={index.toString() + "textInput"}
                            value={todo.name}
                            sortDataByPriority={sortDataByPriority}
                            sortDataByTime={sortDataByTime} 
                        />
                        <PriorityItems 
                            id={index.toString() + "priority"} 
                            value={todo.priority} 
                            style={{ display: "none", marginLeft: "10px" }}
                            sortDataByPriority={sortDataByPriority}
                            sortDataByTime={sortDataByTime} 
                        />
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

const StyledIndividualButton = styled.button`
    margin-left: 10px;
    height: 50%;
`;

export default TodoItem;