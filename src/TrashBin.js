import useFetch from "./useFetch";
import RemovedTasks from "./RemovedTasks";
import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react";
import $ from 'jquery';

const TrashBin = () => {

    const { data: removedTask, setData: setRemovedTask, error, isPending} = useFetch('http://localhost:5000/tasks-removed');
    const history = useHistory();
    const[toBeDeleted, setToBeDeleted] = useState([]);

    useEffect(()=>{
        getData()
    }, [toBeDeleted])


    function getData(){
        fetch('http://localhost:5000/tasks-removed').then((result)=>{
            result.json().then((resp)=>{
                setRemovedTask(resp);
            })
        })
    }

    function restoreSelected(){
      toBeDeleted.map( task => {
        fetch('http://localhost:8000/tasks', {
            method: 'POST',
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json" },
            body: JSON.stringify({task: task.task})
        })
        .then((resp)=>{
            getData();
            removeSelected();
        })
      })
    }

    function removeSelected(){
      toBeDeleted.map( task => {
        fetch('http://localhost:5000/tasks-removed/' + task.id, {
            method: 'DELETE'
        })
        .then((resp)=> {
            // getData();
            console.log(task.id+" is deleted");
            getData()
        })
      })
    }

    //BUTTONS HOVER EFFECT
    $(".buttons").mouseenter(function(){
        $(this).addClass("fa-lg")
    });
    $(".buttons").mouseleave(function(){
      $(this).removeClass("fa-lg")
    });

    return ( 
      <div className="trash-bin">
        <div className="trash-bin-header">
            <button onClick={()=>history.push("/")} className="back">
                <i className="fa-solid fa-arrow-left fa-lg"></i>
            </button> 
            
            <span className="title">Deleted Tasks</span>

            <div className="history-buttons">
                <i className="fa-solid fa-arrow-rotate-right restore buttons" onClick={restoreSelected}></i>

                <i className="fa-solid fa-trash remove-permanently buttons" onClick={removeSelected}></i>
            </div>
        </div>
        { isPending && <div>Fetching data</div> }
        
        { error && <div>Failed to fetch data</div> }

        { removedTask && <RemovedTasks removedTask={removedTask} toBeDeleted ={toBeDeleted} setToBeDeleted={setToBeDeleted}/>}
      </div>  
    );
}
 
export default TrashBin;