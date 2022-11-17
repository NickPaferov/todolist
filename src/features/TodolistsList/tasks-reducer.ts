import {
    addTodolistTC,
    clearStateAC,
    ClearStateActionType,
    fetchTodolistsTC, removeTodolistTC,
} from "./todolists-reducer";
import {TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {AppActionsType, RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolistId: todolistId, tasks: tasks}
    } catch (error: any) {
        handleNetworkError(thunkAPI.dispatch, error.message)
        return thunkAPI.rejectWithValue(null)
    }
})

export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTaskEntityStatusAC({
        todolistId: param.todolistId,
        taskId: param.taskId,
        entityStatus: 'loading'
    }))
    try {
        const res = await todolistAPI.deleteTask(param.todolistId, param.taskId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {taskId: param.taskId, todolistId: param.todolistId}
        } else {
            handleAppError(thunkAPI.dispatch, res.data)
            thunkAPI.dispatch(changeTaskEntityStatusAC({
                todolistId: param.todolistId,
                taskId: param.taskId,
                entityStatus: 'failed'
            }))
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        handleNetworkError(thunkAPI.dispatch, error.message)
        return thunkAPI.rejectWithValue(null)
    }
})

export const addTaskTC = createAsyncThunk("tasks/addTask", async (param: { todolistId: string, taskTitle: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.createTask(param.todolistId, param.taskTitle)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        handleNetworkError(thunkAPI.dispatch, error.message)
        return thunkAPI.rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk("tasks/updateTask",
    async (param: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, {
        dispatch,
        rejectWithValue,
        getState
    }) => {
        const state = getState() as AppRootStateType
        const allTask = state.tasks
        const tasksForCurrentTodolist = allTask[param.todolistId]
        const changedTask = tasksForCurrentTodolist.find((t) => {
            return t.id === param.taskId
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
                ...param.domainModel
            }
            dispatch(setAppStatusAC({status: 'loading'}))
            try {
                const res = await todolistAPI.updateTask(param.todolistId, param.taskId, apiModel)
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    return {taskId: param.taskId, model: param.domainModel, todolistId: param.todolistId}
                } else {
                    handleAppError(dispatch, res.data)
                    return rejectWithValue(null)
                }
            } catch (error: any) {
                handleNetworkError(dispatch, error.message)
                return rejectWithValue(null)
            }
        }
    })

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityStatus: action.payload.entityStatus}
            }
        }
    },
    extraReducers: (bilder) => {
        bilder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        })
        bilder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        bilder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        bilder.addCase(clearStateAC, (state, action) => {
            return {}
        })
        bilder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
        })
        bilder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload?.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        bilder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift({...action.payload, entityStatus: 'idle'})
        })
        bilder.addCase(updateTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload?.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            }
        })
    }
})

export const tasksReducer = slice.reducer

// AC
export const {changeTaskEntityStatusAC} = slice.actions

// types
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
    | AppActionsType
    | ChangeTaskEntityStatusActionType
    | ClearStateActionType
export type TasksStateType = {
    [todoListID: string]: Array<TaskDomainType>
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}