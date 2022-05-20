import React from 'react';
import TodoListHeader from "./TodoListHeader";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";
import AddItemForm from "./AddItemForm";
import ButtonsBlock from "./ButtonsBlock";
import {List} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodoListType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

type TodoListPropsType = {
    todoListID: string
}

const TodolistWithRedux = (props: TodoListPropsType) => {

    const todoList = useSelector<AppRootStateType, TodoListType>(state => state.todoLists
        .filter(todoLists => todoLists.id === props.todoListID)[0])
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])
    const dispatch = useDispatch()

    if (todoList.filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (todoList.filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    const tasksComponents = tasks.map(t => {
        // как вариант в отличие от "removeTask"
        // const changeTaskStatus = () => props.changeTaskStatus(t.id)
        const removeTask = (taskID: string) => dispatch(removeTaskAC(taskID, props.todoListID))
        const changeTaskStatus = (taskID: string, isDone: boolean) =>
            dispatch(changeTaskStatusAC(taskID, isDone, props.todoListID))
        const changeTaskTitle = (taskID: string, title: string) =>
            dispatch(changeTaskTitleAC(taskID, title, props.todoListID))
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

    const setFilterValueHandler = (filter: FilterValuesType) =>
        () => dispatch(changeTodolistFilterAC(props.todoListID, filter))
    const removeTodoList = () => dispatch(removeTodolistAC(props.todoListID))
    const addTask = (title: string) => dispatch(addTaskAC(title, props.todoListID))
    const changeTodoListTitle = (title: string) => dispatch(changeTodolistTitleAC(props.todoListID, title))
    return (
        <div>
            <TodoListHeader
                title={todoList.title}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
            />
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksComponents}
            </List>
            <ButtonsBlock filter={todoList.filter} setFilterValue={setFilterValueHandler}/>
        </div>
    );
};

export default TodolistWithRedux;