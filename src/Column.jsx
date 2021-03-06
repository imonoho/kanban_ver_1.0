import React from "react";
import Task from "./Task";

function Column(props) {
    return (
        <div className='col-4 col-sm Column rounded-lg shadow-lg' style={{border: '1px solid'}}>
            <h3 className='Column-text'>
                {props.column.title}
            </h3>
            {props.task.filter(el => el.status === props.column.status)
                .sort((a, b) => b.priority - a.priority)
                .map(el => <Task column={props.column} task={el} changeTaskStatus={props.changeTaskStatus}
                                 buttonDelete={props.deleteList} key={el.id}
                                 statuses={props.statuses}
                                 priorityChange={props.priorityChange}
                                 priority={props.priority}
                                 editTask={props.editTask}
                />)}
        </div>
    )
}

export default Column;