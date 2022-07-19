import { useState } from 'react';

const AddTask = ({setTodo}) => {
    const [task, setTask] = useState("");

    const handleClick = (e)=> {
        e.preventDefault();
        const todo = {task};

        fetch('http://localhost:8000/tasks', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
        })
        .then(()=>{
            setTodo((prev) => [...prev, { task: task }]);
        })
        setTask('');

    };

    return ( 
    
        <form className="new-task" onSubmit={handleClick}>
            <input className="input" 
                type="text" 
                required
                placeholder='Add new task...'
                value={task}
                onChange= { (e)=> setTask(e.target.value) } 
            />
            
            <button className="add-task">              
                 <i className="fa-solid fa-plus fa-2x"></i>
            </button>
        </form>
        
    );
}
 
export default AddTask;