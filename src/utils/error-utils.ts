import {Dispatch} from "redux";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {CommonResponseType} from "../api/todolist-api";

export const handleNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(setAppErrorAC({error: message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleAppError = <T>(dispatch: Dispatch<AppActionsType>, data: CommonResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}