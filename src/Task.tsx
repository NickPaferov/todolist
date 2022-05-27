import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {DeleteOutline} from '@material-ui/icons';
import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./App";
import EditableSpan from "./EditableSpan";

type TaskPropsType = TaskType & {
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

const Task: React.FC<TaskPropsType> = React.memo((
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

    console.log("Task")

    const onClickRemoveTask = useCallback(() => removeTask(id), [removeTask, id])
    const onChangeChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(id, e.currentTarget.checked), [changeTaskStatus, id])
    const onChangeChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(id, title)
    }, [changeTaskTitle, id])

    return (
        <ListItem divider>
            <span className={isDone ? "is-done" : ""}>
                <Checkbox color="primary"
                          size="small"
                          onChange={onChangeChangeTaskStatus}
                          checked={isDone}/>
                {/*
            <input
                type="checkbox"
                onChange={onChangeChangeTaskStatus}
                checked={isDone}/>
*/}
                <EditableSpan title={title} changeTitle={onChangeChangeTaskTitle}/>
            </span>
            <IconButton onClick={onClickRemoveTask}>
                <DeleteOutline/>
            </IconButton>
            {/*<button onClick={onClickRemoveTask}>x</button>*/}
        </ListItem>
    );
});

export default Task;
