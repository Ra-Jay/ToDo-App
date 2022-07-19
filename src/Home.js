import { Link } from "react-router-dom";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import useFetch from "./useFetch";

const Home = () => {
    const { data: todo, setData: setTodo, isPending, error} = useFetch('http://localhost:8000/tasks');

    return (
        <div className="home">
            <AddTask setTodo={setTodo} />

            { error && <div>Failed to fetch data.</div> }

            { isPending && <div>Loading...</div> }

            { todo && <TaskList todo={todo} setTodo={setTodo} isPending={isPending} /> }
            
            <Link to="/trashbin" className="history">
                View History
            </Link>
        </div>
    );
}
 
export default Home;