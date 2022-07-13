import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import useFetch from "./useFetch";

const Home = () => {
    const [tasks, setTasks] = useState(null);
    const { data: task, setData: setTodo, isPending, error} = useFetch('http://localhost:8000/tasks');

    useEffect(()=> {
        if(task) setTodo(task);
        console.log(task);
    }, [task])

    return (
        <div className="home">
            <AddTask setTodo={setTodo} />
            { error && <div>Failed to fetch data.</div> }
            { isPending && <div>Loading...</div> }
            { task && <TaskList task={task} /> }
            <Link to="/trashbin" className="history">
                View History
            </Link>
        </div>
    );
}
 
export default Home;