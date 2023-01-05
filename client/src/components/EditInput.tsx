import { useEffect, useState } from "react";

interface Props {
    id: string;
    value ?: string;
    sortDataByPriority?: boolean;
    sortDataByTime?: boolean;
}

const EditInput: React.FC<Props> = ({ id, value, sortDataByPriority, sortDataByTime }) => {
    const [inputText, setInputText] = useState<string>(value ? value : "");

    useEffect(() => {
        if (value) {
            setInputText(value);
        }
    }, [sortDataByPriority, sortDataByTime, value])
    
    const selectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputText(value);
    };

    return (
        <input 
            id={id} 
            value={inputText}
            onChange={e => selectChange(e)}
            style={{ display: "none", marginLeft: "10px" }}
        />
    )
}

export default EditInput;