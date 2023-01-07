import { Todo } from "../interfaces/Todo.interface";
import styled from 'styled-components';

// define "Props" interface with seven members 
interface Props {
    backendData: Todo[];
    dataUpdate: boolean;
    setDataUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    sortDataByPriority: boolean;
    setSortDataByPriority: React.Dispatch<React.SetStateAction<boolean>>;
    sortDataByTime: boolean;
    setSortDataByTime: React.Dispatch<React.SetStateAction<boolean>>;
}
// define "todoID" interface with one property 'id' 
interface todoID {
    id: string;
}

// define component AddTodo with properties(Props)
const OperationButtons: React.FC<Props> = ({ 
    backendData, 
    dataUpdate, 
    setDataUpdate, 
    sortDataByPriority, 
    setSortDataByPriority,
    sortDataByTime, 
    setSortDataByTime 
}) => {
    const deleteTodo = (data: todoID) => {
        fetch(`/api/todos/${data.id}`, 
            {
                method: "DELETE", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            }
        )
        .then(response => console.log("Response", response))
        .catch(error => {console.log("Error", error)})
    }
 
    const handleDeleteAll = () => {
        for (let i = 0; i < backendData.length; i++) {
            let deleteData = {id: backendData[i].id};
            deleteTodo(deleteData);
        }
        setDataUpdate(!dataUpdate);
    }

    const sortTasksByPriority = () => {
        setSortDataByPriority(!sortDataByPriority);
    }
    const sortTasksByTime = () => {
        setSortDataByTime(!sortDataByTime);
    }

    return (
        <>
            <StyledButton onClick={sortTasksByPriority} style={{ background: "gold" }}>
                Sort Tasks By Priority
            </StyledButton>
            <StyledButton onClick={sortTasksByTime} style={{ marginLeft: "10px", background: "gold" }}>
                Sort Tasks By Completed Time
            </StyledButton>
            <StyledButton onClick={handleDeleteAll} style={{ marginLeft: "10px", background: "red", color: "white" }}>
                Delete All Tasks
            </StyledButton>
          
        </>
    )
}

const StyledButton = styled.button`
    width: 25%;
    height: 30px;
    margin-top: 20px;
    font-weight: bold;
    font-size: 16px;
`;


export default OperationButtons;