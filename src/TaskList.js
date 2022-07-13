import $ from 'jquery';
import { useEffect } from 'react';

const TaskList = ({task}) => {
    
    useEffect (()=> {}, [task]);

    //MOVE DELETED TASK TO BIN
    const moveDeletedTask = (todo)=> {
        const deletedTodo = {todo};

        fetch('http://localhost:5000/tasks-removed', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(deletedTodo)
        })
        .then(()=>{
            console.log(deletedTodo);
            // alert(deletedTodo);
            // setTodo(prev => ([...prev, todo]))
        })
    };

    //DELETE FUNCTION
    const handleDelete = (id, todo) => {
        moveDeletedTask(todo);
        fetch('http://localhost:8000/tasks/' + id, {
            method: 'DELETE'
        })
        .then((e)=> {
            console.log("Successfully deleted a task");
            console.log({id});
        })
    };

    const handleEdit = (id)=> {
        // $(this).siblings(".paragraph").css({display: "none"});
        // $(this).siblings(".edit-task").css({display: "block"});
        
        $(".paragraph").css({display: "none"});
        $(".edit-task").css({display: "block"});
    }

    //EDIT AND DELETE BUTTON ANIMATION
    $(".task").mouseover(function(){
        $(this).find(".edit").css({bottom: "0", transition: "0.5s"});
        $(this).find(".delete").css({top: "0", transition: "0.5s"});
    });
    
    $(".task").mouseleave(function(){
        $(this).find(".edit").css({bottom: "-40px", transition: "0.3s"});
        $(this).find(".delete").css({top: "-40px", transition: "0.3s"});
    });

    return ( 
        <div className="tasks">
            <ul>
                {task.map((task)=> (
                    <li className="task" key={task.id}>
                        <input type="checkbox" className="checkbox"/>

                        <p className="task-name paragraph" >{task.task}</p>

                        <input 
                            type="text" 
                            className="task-name edit-task" 
                            value={task.task}
                            // onChange= {(e)=> }
                        />

                        <button onClick={()=> handleEdit(task.id)} className="edit button">
                            <i className="fa-solid fa-edit"></i>
                        </button>

                        <button onClick={()=> handleDelete(task.id, task.task) } className="delete button">            
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
     );
}
 
export default TaskList;