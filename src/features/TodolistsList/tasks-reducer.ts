import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from 'redux';
import {AppRootStateType} from "../../app/store";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

// AC
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todolistId, tasks} as const)

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
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(todolistId, tasks))
            }
        )
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, taskTitle)
        .then((res) => {
            const newTask = res.data.data.item
            dispatch(addTaskAC(newTask))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
            todolistAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                })
        }
    }

// types
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>
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
export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}