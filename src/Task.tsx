import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {DeleteOutline} from '@material-ui/icons';
import React, {ChangeEvent, useCallback} from 'react';
import EditableSpan from "./EditableSpan";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type TaskPropsType = TaskType & {
    removeTask: (id: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses) => void
    changeTaskTitle: (id: string, title: string) => void
}

const Task: React.FC<TaskPropsType> = React.memo((
    {
        id,
        status,
        title,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        ...props
    }
) => {
    // const id = props.id
    // const status = props.status
    // const title = props.title
    // const removeTask = props.removeTask
    // const changeTaskStatus = props.changeTaskStatus
    // const {id, isDone, title, removeTask, changeTaskStatus} = props

    console.log("Task")

    const onClickRemoveTask = useCallback(() => removeTask(id), [removeTask, id])
    const onChangeChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [changeTaskStatus, id])
    const onChangeChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(id, title)
    }, [changeTaskTitle, id])

    return (
        <ListItem divider>
            <span className={status === TaskStatuses.Completed ? "is-done" : ""}>
                <Checkbox color="primary"
                          size="small"
                          onChange={onChangeChangeTaskStatus}
                          checked={status === TaskStatuses.Completed}/>
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
