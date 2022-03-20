import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "../Todolist";

type TasksListPropsType={
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    editTitleTask: (todolistId: string, taskId: string, title: string) => void
    todolistId: string
}

export const TasksList = (props: TasksListPropsType) => {
    const{tasks, removeTask, changeTaskStatus, editTitleTask, todolistId }=props
    const editTitleTaskHandler = (taskId: string, title: string) => {
        editTitleTask(todolistId, taskId, title)
    }
    return (
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        changeTaskStatus(todolistId, t.id, newIsDoneValue);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} editTitleCallBack={(title) => editTitleTaskHandler(t.id, title)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
    )
}
