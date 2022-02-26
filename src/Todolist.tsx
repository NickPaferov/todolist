import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    let [newTitle, setNewTitle] = useState("")

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle("")
    }

    const onKeyPressAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickAddTaskHandler()
        }
    }

    // const onClickAllHandler = () => {
    //     props.changeFilter("all")
    // }
    // const onClickActiveHandler = () => {
    //     props.changeFilter("active")
    // }
    // const onClickCompletedHandler = () => {
    //     props.changeFilter("completed")
    // }
    const onClickFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const onClickRemoveTask=(tID:string)=>{
        props.removeTask(tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressAddTaskHandler}/>
            <button onClick={onClickAddTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    // const onClickRemoveTask=()=>{
                    //     props.removeTask(t.id)
                    // }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={()=>onClickRemoveTask(t.id)}>x</button>
                            {/*<button onClick={() => {props.removeTask(t.id)}}>x</button>*/}
                        </li>)
                })
            }
        </ul>
        <div>
            <button onClick={() => onClickFilterHandler("all")}> All</button>
            <button onClick={() => onClickFilterHandler("active")}> Active</button>
            <button onClick={() => onClickFilterHandler("completed")}> Completed</button>
            {/*<button onClick={onClickAllHandler}> All</button>*/}
            {/*<button onClick={onClickActiveHandler}> Active</button>*/}
            {/*<button onClick={onClickCompletedHandler}> Completed</button>*/}
        </div>
    </div>
}
