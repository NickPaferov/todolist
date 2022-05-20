import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import TodoList from './Todolist';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
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

const AppWithReducers = () => {
    // BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const todoListID_3 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
        {id: todoListID_3, title: "What to read", filter: "all"},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "BREAD", isDone: false},
            {id: v1(), title: "MEAT", isDone: true},
        ],
        [todoListID_3]: [
            {id: v1(), title: "You don't know JS", isDone: true},
            {id: v1(), title: "Understanding Redux", isDone: false},
            {id: v1(), title: "How to learn React", isDone: false},
        ],
    })

    const removeTask = (taskID: string, todoListID: string) => {
        // let action = removeTaskAC(taskID, todoListID)
        // dispatchToTasks(action)
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }

    const addTask = (title: string, todoListID: string) => {
        // let action = addTaskAC(title, todoListID)
        // dispatchToTasks(action)
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        // let action = changeTaskStatusAC(taskID, isDone, todoListID)
        // dispatchToTasks(action)
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }

    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        // let action = changeTaskTitleAC(taskID, title, todoListID)
        // dispatchToTasks(action)
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

    const removeTodoList = (todoListID: string) => {
        let action = removeTodolistAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const addTodoList = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        // let action = changeTodolistTitleAC(todoListID, title)
        // dispatchToTodoLists(action)
        dispatchToTodoLists(changeTodolistTitleAC(todoListID, title))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        // let action = changeTodolistFilterAC(todoListID, filter)
        // dispatchToTodoLists(action)
        dispatchToTodoLists(changeTodolistFilterAC(todoListID, filter))
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

export default AppWithReducers;
