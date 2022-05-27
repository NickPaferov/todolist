import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {DeleteOutline} from '@material-ui/icons';
import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./App";
import EditableSpan from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

type TaskPropsType = {
    taskID: string
    todoListID: string
}

const TaskWithRedux: React.FC<TaskPropsType> = React.memo(({taskID, todoListID}) => {

    console.log("Task")

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoListID]
        .filter(t => t.id === taskID)[0])

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
