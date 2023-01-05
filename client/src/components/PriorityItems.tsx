import { useEffect, useState } from "react";

interface Props {
    id: string;
    style ?: Object;
    value ?: string;
    sortDataByPriority?: boolean;
    sortDataByTime?: boolean;
}

const PriorityItems: React.FC<Props> = ({ id, style, value, sortDataByPriority, sortDataByTime }) => {
    const [priorityLevel, setPriorityLevel] = useState<string>(value ? value : "High");

    useEffect(() => {
        if (value) {
            setPriorityLevel(value);
        }
    }, [sortDataByPriority, sortDataByTime, value])
    
    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPriorityLevel(value);
    };

    return (
        <select id={id} value={priorityLevel} onChange={selectChange} style={style} >
            <option value="High">High</option>
            <option value="Alarming">Alarming</option>
            <option value="Low">Low</option>
        </select>
    )
}

export default PriorityItems;