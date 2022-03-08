import React, {ChangeEvent} from 'react';
import { TaskType } from './Todolist';

type PropsType={
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    todoListId: string
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
}

export const MapTasks = ({tasks, removeTask, todoListId, changeTaskStatus, ...props}: PropsType) => {
    return (
            <ul>
                {
                    tasks.map(t => {
                        const onClickHandler = () => removeTask(todoListId, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todoListId, t.id, e.currentTarget.checked);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
    );
};
