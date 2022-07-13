import useFetch from "./useFetch";
import RemovedTasks from "./RemovedTasks";
import { useHistory } from "react-router-dom"

const TrashBin = () => {
    
    const { data: removedTask, setData: setRemovedTask, error, isPending} = useFetch('http://localhost:5000/tasks-removed');
    const history = useHistory();

    return ( 
      <div className="trash-bin">
        <div className="trash-bin-header">
            <button onClick={()=>history.push("/")} className="back">
                <i className="fa-solid fa-arrow-left fa-lg"></i>
            </button> 
            <span className="title">Deleted Tasks</span>
            <div className="history-buttons">
                <i className="fa-solid fa-arrow-rotate-right restore"></i>
                <i className="fa-solid fa-trash remove-permanently"></i>
            </div>
        </div>
        { isPending && <div>Fetching data</div> }
        { error && <div>Failed to fetch data</div> }
        { removedTask && <RemovedTasks removedTask={removedTask}/>}
      </div>  
    );
}
 
export default TrashBin;