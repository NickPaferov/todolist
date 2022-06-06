import React, {useCallback} from 'react';
import TodoListHeader from "./TodoListHeader";
import Task from "./Task";
import AddItemForm from "./AddItemForm";
import ButtonsBlock from "./ButtonsBlock";
import {List} from '@material-ui/core';
import {FilterValuesType, TaskType} from "./AppWithRedux";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {

    console.log("Todolist")

    let tasksForRender = props.tasks
    if (props.filter === "active") {
        tasksForRender = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForRender = props.tasks.filter(t => t.isDone)
    }

    const removeTask = useCallback((taskID: string) =>
        props.removeTask(taskID, props.id), [props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean) =>
        props.changeTaskStatus(taskID, isDone, props.id), [props.changeTaskStatus, props.id])
    const changeTaskTitle = useCallback((taskID: string, title: string) =>
        props.changeTaskTitle(taskID, title, props.id), [props.changeTaskTitle, props.id])

    const tasksComponents = tasksForRender.map(t => {
        return (
            <Task
                key={t.id}
                //{...t}
                id={t.id}
                title={t.title}
                isDone={t.isDone}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })

    const setFilterValue = useCallback((filter: FilterValuesType) =>
        () => props.changeFilter(filter, props.id), [props.changeFilter, props.id])
    const removeTodoList = useCallback(() =>
        props.removeTodoList(props.id), [props.removeTodoList, props.id])
    const addTask = useCallback((title: string) =>
        props.addTask(title, props.id), [props.addTask, props.id])
    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.id), [props.changeTodoListTitle, props.id])
    return (
        <div>
            <TodoListHeader
                title={props.title}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
            />
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksComponents}
            </List>
            <ButtonsBlock filter={props.filter} setFilterValue={setFilterValue}/>
        </div>
    );
});

export default TodoList;