import {todolistAPI, TodolistType} from '../../api/todolist-api';
import {AppActionsType, RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

export const fetchTodolistsTC = createAsyncThunk("todolists/fetchTodolists", async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodolists()
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
        handleNetworkError(thunkAPI.dispatch, error.message)
        return thunkAPI.rejectWithValue(null)
    }
})

export const removeTodolistTC = createAsyncThunk("todolists/removeTodolist", async (param: { todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, entityStatus: 'loading'}))
    try {
        const res = await todolistAPI.deleteTodolist(param.todolistId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolistId: param.todolistId}
        } else {
            handleAppError(thunkAPI.dispatch, res.data)
            thunkAPI.dispatch(changeTodolistEntityStatusAC({todolistId: param.todolistId, entityStatus: 'failed'}))
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        handleNetworkError(thunkAPI.dispatch, error.message)
        return thunkAPI.rejectWithValue(null)
    }
})

export const addTodolistTC = createAsyncThunk("todolists/addTodolist", async (param: { title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        handleNetworkError(thunkAPI.dispatch, error.message)
        return thunkAPI.rejectWithValue(null)
    }
})

export const changeTodoListTitleTC = createAsyncThunk("todolist/changeTodoListTitle", async (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.updateTodolistTitle(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolistId: param.todolistId, title: param.title}

        } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)

        }
    } catch (error: any) {
        handleNetworkError(thunkAPI.dispatch, error.message)
        return thunkAPI.rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        clearStateAC(state, action: PayloadAction<{}>) {
            return []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        })
    }
})

export const todolistsReducer = slice.reducer

// AC
export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    clearStateAC
} = slice.actions

// types
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearStateActionType = ReturnType<typeof clearStateAC>
export type TodolistsActionsType =
    | ChangeTodolistFilterActionType
    | AppActionsType
    | ChangeTodolistEntityStatusActionType
    | ClearStateActionType
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}