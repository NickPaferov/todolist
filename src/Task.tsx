import React, {ChangeEvent} from 'react';
import {TaskType} from "./App";
import EditableSpan from "./EditableSpan";

type TaskPropsType = TaskType & {
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

const Task: React.FC<TaskPropsType> = (
    {
        id,
        isDone,
        title,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        ...props
    }
) => {
    // const id = props.id
    // const isDone = props.isDone
    // const title = props.title
    // const removeTask = props.removeTask
    // const changeTaskStatus = props.changeTaskStatus
    // const {id, isDone, title, removeTask, changeTaskStatus} = props

    const onClickRemoveTask = () => removeTask(id)
    const onChangeChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(id, e.currentTarget.checked)
    const onChangeChangeTaskTitle = (title: string) => {
        changeTaskTitle(id, title)
    }
    return (
        <li className={isDone ? "is-done" : ""}>
            <input
                type="checkbox"
                onChange={onChangeChangeTaskStatus}
                checked={isDone}/>
            <EditableSpan title={title} changeTitle={onChangeChangeTaskTitle}/>
            <button onClick={onClickRemoveTask}>x</button>
        </li>
    );
};

export default Task;