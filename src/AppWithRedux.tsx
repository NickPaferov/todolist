import React from 'react';
import './App.css';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import TodoList from './Todolist';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {AppRootStateType} from "./store/store";
import {useDispatch, useSelector} from 'react-redux';
// C
// R
// U
// D
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

const AppWithRedux = () => {
    // BLL:

    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    // const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const {tasks, todoLists} = useSelector<AppRootStateType, AppRootStateType>(state => state)
    const dispatch = useDispatch()

    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }

    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }

    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(todoListID, title))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, filter))
    }

    const getTasksForRender = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const tasksForRender = getTasksForRender(tl)
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "20px"}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForRender}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeTodoListFilter}
                        addTask={addTask}
                        removeTodoList={removeTodoList}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    // GUI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant="outlined">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "25px 0"}} justifyContent="center">
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5} justifyContent="center">
                    {todoListsComponents}
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
