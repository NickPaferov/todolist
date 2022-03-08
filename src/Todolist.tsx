import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {UniversalInputFull} from "./UniversalInputFull";
import {Input} from "./Input";
import {Button} from "./Button";
import {buildTimeValue} from "@testing-library/user-event/dist/utils";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    console.log(title)

    // const addTask = () => {
    //     props.addTask(title);
    //     setTitle("");
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const callBackHandlerForAddTask=()=>{
        props.addTask(title)
        setTitle("")
    }

    const onClickHandler = (tId:string) => props.removeTask(tId)

    // const onAllClickHandler = () => props.changeFilter("all");
    // const onActiveClickHandler = () => props.changeFilter("active");
    // const onCompletedClickHandler = () => props.changeFilter("completed");
    const onClickForFilteres=(value:FilterValuesType)=>{
        props.changeFilter(value)
    }


    return <div>
        <h3>{props.title}</h3>
        <Input title={title} setTitle={setTitle} callBack={callBackHandlerForAddTask}/>
        <Button name={"+"} callBack={callBackHandlerForAddTask} />
        {/*<Button name={"+"} callBack={props.addTask} title={title} setTitle={setTitle}/>*/}
        {/*<UniversalInputFull addTask={props.addTask}/>*/}
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={ onChangeHandler }*/}
        {/*           onKeyPress={ onKeyPressHandler }*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*</div>*/}
        <ul>
            {
                props.tasks.map(t => {

                    // const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        {/*<button onClick={ onClickHandler }>x</button>*/}
                        <Button name={"x"} callBack={ ()=>onClickHandler(t.id) } />
                    </li>
                })
            }
        </ul>
        <div>
            {/*<button onClick={ onAllClickHandler }>All</button>*/}
            {/*<button onClick={ onActiveClickHandler }>Active</button>*/}
            {/*<button onClick={ onCompletedClickHandler }>Completed</button>*/}
            <Button name={"All"} callBack={()=>onClickForFilteres("all")}/>
            <Button name={"Active"} callBack={()=>onClickForFilteres("active")}/>
            <Button name={"Completed"} callBack={()=>onClickForFilteres("completed")}/>
        </div>
    </div>
}
