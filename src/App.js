import React, {useState} from 'react';
import './App.css';
import Column from "./Column";
import 'bootstrap/dist/css/bootstrap.css';


import AddNew from "./AddNew";
import NewStatus from "./NewStatus";
import Trash from "./Trash";


const taskList = [
    {id: Math.random(), name: 'First Task', status: 'todo', priority: 4},
    {id: Math.random(), name: 'Second Task', status: 'progress', priority: 6},
    {id: Math.random(), name: 'Third Task', status: 'review', priority: 5},
    {id: Math.random(), name: 'Fifth Task', status: 'review', priority: 8},
    {id: Math.random(), name: 'Six Task', status: 'done', priority: 10},
    {id: Math.random(), name: 'Forth Task', status: 'done', priority: 9}
];

const columnArray = [
    {id: Math.random(), title: 'To do', status: 'todo'},
    {id: Math.random(), title: 'Progress', status: 'progress'},
    {id: Math.random(), title: 'Review', status: 'review'},
    {id: Math.random(), title: 'Done', status: 'done'}
];


const statuses = ['todo', 'progress', 'review', 'done'];
const priority = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function App() {


    const [tasks, setTask] = useState(taskList);
    const [column, setColumn] = useState(columnArray)
    const [trashBascket, setTrashBascket] = useState([{
        id: Math.random(),
        name: 'Forth Task',
        status: 'done',
        priority: 9
    }]);


    const priorityChange = (id, value) => {
        const newTask = tasks.map(el => {
            if (el.id === id) {
                el.priority = priority[priority.indexOf(el.priority) + value]
            }
            return el;
        })
        setTask(newTask)
    }


    const createStatuse = (inputStatuse) => {

        const newStatus = [...column, {id: Math.random(), title: inputStatuse, status: inputStatuse, priority: 1}];
        setColumn(newStatus);
        statuses.push(inputStatuse);
    }


    const createTask = (newName, newStatus) => {
        const newTask = [...tasks, {id: Math.random(), name: newName, status: newStatus, priority: 1}]
        setTask(newTask);
    }


    const changeTaskStatus = (taskId, direction) => {
        const newTask = tasks.map((el) => {
            if (el.id === taskId) {
                if (direction === 'right') {
                    el.status = statuses[statuses.indexOf(el.status) + 1]
                }
                if (direction === 'left') {
                    el.status = statuses[statuses.indexOf(el.status) - 1]
                }

            }
            return el;
        })
        setTask(newTask);
    }


    const buttonDelete = (id, name, status, priority) => {
        const newTask = tasks.filter(el => el.id !== id);
        const newTrash = [...trashBascket, {id: id, name: name, status: status, priority: priority}]
        setTrashBascket(newTrash)
        setTask(newTask);
        console.log(newTrash)
    }


    const editTask = (id, newTask) => {
        const updatedTask = tasks.map(el => {
            if (el.id === id) {
                return {...el, ...newTask}
            }
            return el;
        })
        setTask(updatedTask);
    }


    return (

        <div className='App'>
            <div className="container">

                <AddNew createTask={createTask} column={column}/>
                <NewStatus createStatuse={createStatuse}/>
                <div className="row">

                    {column.map(el => <Column column={el}
                                              task={tasks} key={el.id}
                                              changeTaskStatus={changeTaskStatus}
                                              buttonDelete={buttonDelete}
                                              statuses={statuses}
                                              priorityChange={priorityChange}
                                              priority={priority}
                                              editTask={editTask}
                    />)}
                </div>
                <Trash trashBascket={trashBascket}/>
            </div>

        </div>
    );
}

export default App;
