import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from "./components/EditableSpan";
import {TasksList} from "./components/TasksList";
import {Button} from "./components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    editTitleTodolist: (todolistId: string, title: string) => void
    editTitleTask: (todolistId: string, taskId: string, title: string) => void
}

export function Todolist(props: PropsType) {
    // const removeTodolist = () => props.removeTodolist(props.todolistId)

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const editTitleTodolistHandler = (title: string) => {
        props.editTitleTodolist(props.todolistId, title)
    }

    const onFilterClickHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value)
    }
    /*
        const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
        const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
        const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");
    */

    return <div>
        <h3>
            <EditableSpan editTitleCallBack={editTitleTodolistHandler} title={props.title}/>
            <Button buttonCallBack={()=>props.removeTodolist(props.todolistId)} name={"x"}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <TasksList
            tasks={props.tasks}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            editTitleTask={props.editTitleTask}
            todolistId={props.todolistId}
        />
        <div>
            <Button buttonCallBack={() => onFilterClickHandler("all")} filter={props.filter} name={"all"}/>
            <Button buttonCallBack={() => onFilterClickHandler("active")} filter={props.filter} name={"active"}/>
            <Button buttonCallBack={() => onFilterClickHandler("completed")} filter={props.filter} name={"completed"}/>

            {/*<button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>*/}
        </div>
    </div>
}


