import React, {useCallback} from 'react';
import TodoListHeader from "./TodoListHeader";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import ButtonsBlock from "./ButtonsBlock";
import {List} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodoListType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./store/todolists-reducer";
import {addTaskAC} from "./store/tasks-reducer";
import TaskWithRedux from "./TaskWithRedux";

type TodoListPropsType = {
    todoListID: string
}

const TodolistWithRedux = React.memo((props: TodoListPropsType) => {

    console.log("TodolistWithRedux")

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
        return (
            <TaskWithRedux
                key={t.id}
                //{...t}
                task={t}
                todoListID={props.todoListID}
            />
        )
    })

    const setFilterValueHandler = useCallback((filter: FilterValuesType) =>
            () => dispatch(changeTodolistFilterAC(props.todoListID, filter)),
        [dispatch, changeTodolistFilterAC, props.todoListID])
    const removeTodoList = useCallback(() =>
            dispatch(removeTodolistAC(props.todoListID)),
        [dispatch, removeTodolistAC, props.todoListID])
    const addTask = useCallback((title: string) =>
            dispatch(addTaskAC(title, props.todoListID)),
        [dispatch, addTaskAC, props.todoListID])
    const changeTodoListTitle = useCallback((title: string) =>
            dispatch(changeTodolistTitleAC(props.todoListID, title)),
        [dispatch, changeTodolistTitleAC, props.todoListID])
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
});

export default TodolistWithRedux;