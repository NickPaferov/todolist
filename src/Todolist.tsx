import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import TodoListHeader from "./TodoListHeader";
import Button from "./Button";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todolistID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksComponents = props.tasks.map(t => {
        // как вариант в отличие от "removeTask"
        // const changeTaskStatus = () => props.changeTaskStatus(t.id)
        const removeTask = (taskID: string) => props.removeTask(taskID, props.id)
        const changeTaskStatus = (taskID: string, isDone: boolean) => props.changeTaskStatus(taskID, isDone, props.id)
        return (
            <Task
                key={t.id}
                //{...t}
                id={t.id}
                title={t.title}
                isDone={t.isDone}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })
    // const tasksComponents = props.tasks.map(t => <Task key={t.id} {...t} />)

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTask()
    const setAllFilter = () => props.changeFilter("all", props.id)
    const setActiveFilter = () => props.changeFilter("active", props.id)
    const setCompletedFilter = () => props.changeFilter("completed", props.id)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const removeTodoList = () => props.removeTodoList(props.id)

    const errorMessageStyle = {color: "white", backgroundColor: "red"}
    const errorMessage = error
        ? <div style={errorMessageStyle}>Title is required!</div>
        : null

    return (
        <div>
            <TodoListHeader title={props.title} removeTodoList={removeTodoList}/>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle} //input.value
                    onKeyPress={onKeyPressAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksComponents}
            </ul>
            <div>
                <Button
                    active={props.filter === "all"}
                    title={"All"}
                    onClickHandler={setAllFilter}
                />
                <Button
                    active={props.filter === "active"}
                    title={"Active"}
                    onClickHandler={setActiveFilter}
                />
                <Button
                    active={props.filter === "completed"}
                    title={"Completed"}
                    onClickHandler={setCompletedFilter}
                />
            </div>
        </div>
    );
};

export default TodoList;