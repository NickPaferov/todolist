import {
    addTodolistAC,
    AddTodolistActionType,
    clearStateAC,
    ClearStateActionType,
    removeTodolistAC,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from 'redux';
import {AppRootStateType} from "../../app/store";
import {AppActionsType, RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityStatus: action.payload.entityStatus}
            }
        }
    },
    extraReducers: (bilder) => {
        bilder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        })
        bilder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        bilder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        bilder.addCase(clearStateAC, (state, action) => {
            return {}
        })
    }
})

export const tasksReducer = slice.reducer

/*export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
        }
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state, [action.task.todoListId]:
                    [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "CHANGE-TASK-ENTITY-STATUS":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case "CLEAR-STATE":
            return {}
        default:
            return state
    }
}*/

// AC
/*
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
*/
export const {removeTaskAC} = slice.actions

/*
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
*/
export const {addTaskAC} = slice.actions

/*
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
*/
export const {updateTaskAC} = slice.actions

/*
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todolistId, tasks} as const)
*/
export const {setTasksAC} = slice.actions

/*
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, taskId, entityStatus} as const)
*/
export const {changeTaskEntityStatusAC} = slice.actions


// thunk
/*export const fetchTasksThunk = (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(todolistId, tasks)
                dispatch(action)
            }
        )
}*/

// TC
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC({todolistId: todolistId, tasks: tasks}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTaskEntityStatusAC({todolistId: todolistId, taskId: taskId, entityStatus: 'loading'}))
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({taskId: taskId, todolistId: todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleAppError(dispatch, res.data)
                dispatch(changeTaskEntityStatusAC({todolistId: todolistId, taskId: taskId, entityStatus: 'failed'}))
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTask(todolistId, taskTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const newTask = res.data.data.item
                dispatch(addTaskAC({task: newTask}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkError(dispatch, error.message)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const allTask = state.tasks
        const tasksForCurrentTodolist = allTask[todolistId]
        const changedTask = tasksForCurrentTodolist.find((t) => {
            return t.id === taskId
        })
        if (changedTask) {
            const apiModel: UpdateTaskModelType = {
                status: changedTask.status,
                title: changedTask.title,
                completed: changedTask.completed,
                description: changedTask.description,
                deadline: changedTask.deadline,
                priority: changedTask.priority,
                startDate: changedTask.startDate,
                ...domainModel
            }
            dispatch(setAppStatusAC({status: 'loading'}))
            todolistAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({taskId: taskId, model: domainModel, todolistId: todolistId}))
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                    } else {
                        handleAppError(dispatch, res.data)
                    }
                })
                .catch((error: AxiosError) => {
                    handleNetworkError(dispatch, error.message)
                })
        }
    }

// types
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>
type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatusAC>
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type TasksActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType
    | AppActionsType
    | ChangeTaskEntityStatusActionType
    | ClearStateActionType
export type TasksStateType = {
    [todoListID: string]: Array<TaskDomainType>
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}