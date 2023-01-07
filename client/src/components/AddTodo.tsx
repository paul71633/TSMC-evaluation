import { useState } from 'react';
import uuid from 'react-uuid';
import PriorityItems from './PriorityItems';
import { postTodo } from './api';

interface Props {
    dataUpdate: boolean;
    setDataUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodo: React.FC<Props> = ({ dataUpdate, setDataUpdate }) => {

    const [thingsTodo, setThingsTodo] = useState<string>("");

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const selectPriority = document.getElementById("priority") as HTMLSelectElement;
        const newTodo = {
            name: thingsTodo, id: uuid(), priority: selectPriority.value, completed: false, completedTime: new Date(8640000000000000)
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
                <PriorityItems id="priority" />
                <input type="submit" value="SUBMIT"
                 style={{ marginLeft: "10px", background: "green", color: "white" }} />
            </form>
        </div>
    )
}

export default AddTodo