const RemovedTasks = ({removedTask}) => {
    return ( 
        <div className="removed-list">
            {removedTask.map((removedTask)=> (
                <div className="deleted-item task" key={removedTask.id}>
                    <input type="checkbox" className="checkbox"/>
                    <p className="task-name">{removedTask.task}</p>
                </div>
            ))}
        </div>
    );
}
 
export default RemovedTasks;