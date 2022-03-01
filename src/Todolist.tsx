import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import FullInput from "./components/FullInput";
import Input from "./components/Input";
import NewButton from "./components/NewButton";

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
    console.log(newTitle)

    //
    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setNewTitle(event.currentTarget.value)
    // }

    // const onClickHandler = () => {
    //     props.addTask(newTitle)
    //     setNewTitle("")
    // }

    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === "Enter") {
    //         onClickHandler()
    //     }
    // }

    // const onClickAllHandler = ()=>{props.changeFilter("all")}
    // const onClickActiveHandler = ()=>{props.changeFilter("active")}
    // const onClickCompletedHandler = ()=>{props.changeFilter("completed")}

    const onClickFilerHandler = (value: FilterValuesType) =>{
        props.changeFilter(value)
    }

    const onClickRemoveTask=(tID:string)=>{
        props.removeTask(tID)
    }

    const callBackHandlerNewButton=()=>{
        props.addTask(newTitle)
            setNewTitle("")
    }

    return <div>
        <h3>{props.title}</h3>
        <Input newTitle={newTitle} setNewTitle={setNewTitle} addTask={props.addTask}/>
        <NewButton name={"+"} callBack={callBackHandlerNewButton}/>
        {/*<FullInput addTask={props.addTask}/>*/}
        {/*<div>*/}
        {/*    <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>*/}
        {/*    <button onClick={onClickHandler}>+</button>*/}
        {/*</div>*/}
        <ul>
            {
                props.tasks.map(t => {

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            {/*<button onClick={()=>onClickRemoveTask(t.id)}>x</button>*/}
                            <Button name={"xxx"} callBack={()=>onClickRemoveTask(t.id)}/>
                        </li>)
                })
            }
        </ul>
        <div>
            {/*<button onClick={()=>onClickFilerHandler("all")}> All</button>*/}
            {/*<button onClick={()=>onClickFilerHandler("active")}> Active</button>*/}
            {/*<button onClick={()=>onClickFilerHandler("completed")}> Completed</button>*/}

            <Button name={"all"} callBack={()=>onClickFilerHandler("all")}/>
            <Button name={"active"} callBack={()=>onClickFilerHandler("active")}/>
            <Button name={"completed"} callBack={()=>onClickFilerHandler("completed")}/>

        </div>
    </div>
}
