import { useState } from 'react'
import uuid from 'react-uuid';
import { Todo } from '../interfaces/Todo.interface'

interface Props {
    dataUpdate: boolean;
    setDataUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodo: React.FC<Props> = ({ dataUpdate, setDataUpdate }) => {

    const [thingsTodo, setThingsTodo] = useState<string>("");
    const [priorityLevel, setPriorityLevel] = useState<string>("high");

    const postTodo = (data: Todo) => {
        fetch("/api/post", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
            .then(response => console.log("Response", response))
            .catch(error => {
                console.log("Error", error)
            })
    }

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPriorityLevel(value);
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const newTodo = {
            name: thingsTodo, id: uuid(), priority: priorityLevel, completed: false
        }
        postTodo(newTodo);
        setDataUpdate(!dataUpdate);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="thingsTodo">Things To Do:&nbsp; </label>
                <input type="text" id="thingsTodo" value={thingsTodo} onChange={(e) => setThingsTodo(e.target.value)} required />
                <label htmlFor="priority">&nbsp; &nbsp;  Priority Level:&nbsp; </label>
                <select id="priority" value={priorityLevel} onChange={selectChange} >
                    <option value="high">High</option>
                    <option value="alarming">Alarming</option>
                    <option value="low">Low</option>
                </select>
                <input type="submit" value="SUBMIT"
                 style={{ marginLeft: "10px", background: "green", color: "white" }} />
            </form>
        </div>
    )
}

export default AddTodo