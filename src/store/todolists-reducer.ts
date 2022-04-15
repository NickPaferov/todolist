import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
}

export type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string,
    id: string
}

export type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType,
    id: string
}

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodoListType = {id: newTodoListID, title: action.title, filter: "all"}
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl
            )
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
                : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: id
    }
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title
    }
}

export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        id: id
    }
}

export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter: filter,
        id: id
    }
}