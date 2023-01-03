import { useState } from "react";

interface Props {
    id: string;
    style ?: Object;
    value ?: string;
}

const PriorityItems: React.FC<Props> = ({ id, style, value }) => {
    const [priorityLevel, setPriorityLevel] = useState<string>("High");
    
    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPriorityLevel(value);
    };

    return (
        <select id={id} value={value ? value : priorityLevel} onChange={selectChange} style={style} >
            <option value="High">High</option>
            <option value="Alarming">Alarming</option>
            <option value="Low">Low</option>
        </select>
    )
}

export default PriorityItems;