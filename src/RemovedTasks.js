import $ from 'jquery';
import { useState,useEffect } from 'react';

const RemovedTasks = ({removedTask, setToBeDeleted}) => {
    const [temp, setTemp] = useState([]);
    const [isChecked, setIsChecked] = useState(true);

    function handleCheckbox(e, id, task){
        setIsChecked(e.target.checked);
        if(isChecked){
            setTemp((prev)=> [...prev, {'task': task, 'id': id}]);
            setToBeDeleted(temp);
        }
    }
    
    return ( 
        <div className="removed-list">
            {removedTask.map((removedTask)=> (
                <div className="deleted-item task" key={removedTask.id} >
                    <input type="checkbox" className="checkbox" onClick={(e)=>handleCheckbox(e, removedTask.id, removedTask.task)} />
                    <p className="task-name" >{removedTask.task}</p>
                </div>
            ))}
        </div>
    );
}
 
export default RemovedTasks;