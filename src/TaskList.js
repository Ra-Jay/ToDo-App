import $ from 'jquery';
import { useEffect, useState } from 'react';

const TaskList = ({todo, setTodo, isPending}) => {
    
    const [todos, setTodos] = useState(""); 
    const [tempVar, setTempVar] = useState();
    useEffect(()=>{
        getData();
    }, [isPending])

    function getData(){
        fetch('http://localhost:8000/tasks').then((result)=>{
            result.json().then((resp)=>{
                setTodo(resp);
            })
        })
    }

    //DELETE FUNCTION
    const handleDelete = (id, task) => {
        
        //MOVE TO HISTORY
        fetch('http://localhost:5000/tasks-removed', {
            method: 'POST',
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json" },
            body: JSON.stringify({task: task})
        })
        .then((resp)=>{
            getData();
        })

        //DELETE TASK
        fetch('http://localhost:8000/tasks/' + id, {
            method: 'DELETE'
        })
        .then((resp)=> {
            getData();
        })
    };

    //EDIT FUNCTION
    $(".edit").click(function(){

        let button = $(this).data("clicked", true);
        if(button){
            setTodos($(this).siblings(".paragraph").text());
            $(this).siblings(".paragraph").css({display: "none"});
            $(this).siblings(".edit-task").css({display: "block"});
        }
        $(this).addClass("edit-clicked");
        $(this).removeClass("edit"); 
        $(this).find("i").attr("class", "fa-solid fa-check");
    })

    $(".edit-clicked").click(function(){
        const id = $(this).parents(".task").attr("id");
        let temp = todos;

        console.log("temp:", temp);

        fetch('http://localhost:8000/tasks/' + id, {
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({task: temp})
        })
        .then(()=> {
            console.log("id: ", {id});
            getData();
        })

        setTodos($(this).siblings(".paragraph").text());
        $(this).siblings(".paragraph").css({display: "block"});
        $(this).siblings(".edit-task").css({display: "none"});

        $(this).addClass("edit");
        $(this).removeClass("edit-clicked");

        $(this).find("i").attr("class", "fa-solid fa-edit");
    });

    //HANDLE CHECKBOX
    $(function(){
        $(".checkbox").click(function(){
            let cb = $(this).is(':checked');
            if(cb == true)
                $(this).siblings(".paragraph")
                .css({
                    textDecoration: "line-through",
                    opacity: "0.5"
                });
            else
                $(this).siblings(".paragraph")
                .css({
                    textDecoration: "none",
                    opacity: "1"
                });
        })
    })
    //EDIT AND DELETE BUTTON ANIMATION
    $(".task").mouseover(function(){
        $(this).find(".edit").css({bottom: "0", transition: "0.5s"});
        $(this).find(".edit-clicked").css({bottom: "0", transition: "0.5s"});
        $(this).find(".delete").css({top: "0", transition: "0.5s"});
        $(this).find(".task-name").css({fontSize: "1.1rem", cursor: "default"});
    });
    
    $(".task").mouseleave(function(){
        $(this).find(".edit").css({bottom: "-40px", transition: "0.3s"});
        $(this).find(".edit-clicked").css({bottom: "-40px", transition: "0.3s"});
        $(this).find(".delete").css({top: "-40px", transition: "0.3s"});
        $(this).find(".task-name").css({fontSize: "1rem"});
    });

    return ( 
        <div className="tasks">
            <ul>
                {todo.map((todo)=> (
                    <li className="task" id={todo.id} key={todo.id}>
                        <input type="checkbox" className="checkbox"/>

                        <p className="task-name paragraph" >{todo.task}</p>

                        <input 
                            type="text" 
                            className="task-name edit-task" 
                            value={todos}
                            onChange= { (e)=> setTodos(e.target.value) } 
                        />

                        <button className="edit button">
                            <i className="fa-solid fa-edit"></i>
                        </button>

                        <button onClick={()=> handleDelete(todo.id, todo.task) } className="delete button">            
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
     );
}
    
export default TaskList;