import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
// C
// R
// U
// D
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    // BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const todoListID_3 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
        {id: todoListID_3, title: "What to read", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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

    // const todoListTitle: string = "What to learn"
    // const [filter, setFilter] = useState<FilterValuesType>("all")
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true}, //"completed"
    //     {id: v1(), title: "JS/ES6", isDone: true}, // "completed"
    //     {id: v1(), title: "REACT", isDone: true}, // "completed"
    // ])
    const removeTask = (taskID: string, todoListID: string) => {
        // const tasksFromTodoList = tasks[todoListID]
        // const filteredTasks = tasksFromTodoList.filter(t => t.id !== taskID)
        // tasks[todoListID] = filteredTasks
        // setTasks({...tasks})
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        // const tasksFromTodoList = tasks[todoListID]
        // const updatedTasks: Array<TaskType> = [newTask, ...tasksFromTodoList]
        // tasks[todoListID]=updatedTasks
        // setTasks({...tasks})
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})


    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        // const updatedTasks = tasks.map(t => {
        //     let result;
        //     if(t.id === taskID){
        //         const copyTask = {...t}
        //         copyTask.isDone = isDone
        //         result = copyTask
        //     } else {
        //         result = t
        //     }
        //     return result
        // })
        // setTasks(updatedTasks)

        // const tasksFromTodoList = tasks[todoListID]
        // const updatedTasks = tasksFromTodoList.map(t => t.id === taskID ? {...t, isDone} : t)
        // tasks[todoListID] = updatedTasks
        // setTasks({...tasks})
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todolistID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
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
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })
    // UI:
    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
