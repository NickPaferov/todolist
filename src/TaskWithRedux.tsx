import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {DeleteOutline} from '@material-ui/icons';
import React, {ChangeEvent, useCallback} from 'react';
import EditableSpan from "./EditableSpan";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {TaskType} from './AppWithRedux';

type TaskPropsType = {
    task: TaskType
    todoListID: string
}

const TaskWithRedux: React.FC<TaskPropsType> = React.memo(({task, todoListID}) => {

    console.log("Task")

    const taskID = task.id

    const dispatch = useDispatch()

    const onClickRemoveTask = useCallback(() => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch, removeTaskAC, taskID, todoListID])
    const onChangeChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(taskID, e.currentTarget.checked, todoListID))
    }, [dispatch, changeTaskStatusAC, taskID, todoListID])
    const onChangeChangeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [dispatch, changeTaskTitleAC, taskID, todoListID])

    return (
        <ListItem divider>
            <span className={task.isDone ? "is-done" : ""}>
                <Checkbox color="primary"
                          size="small"
                          onChange={onChangeChangeTaskStatus}
                          checked={task.isDone}/>
                {/*
            <input
                type="checkbox"
                onChange={onChangeChangeTaskStatus}
                checked={isDone}/>
*/}
                <EditableSpan title={task.title} changeTitle={onChangeChangeTaskTitle}/>
            </span>
            <IconButton onClick={onClickRemoveTask}>
                <DeleteOutline/>
            </IconButton>
            {/*<button onClick={onClickRemoveTask}>x</button>*/}
        </ListItem>
    );
});

export default TaskWithRedux;
