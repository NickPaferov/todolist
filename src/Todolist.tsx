import React from 'react';

type propsType = {
    title1?: string
    title2?: string
    arrForTodolist: Array<InArrayType>
}

type InArrayType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: propsType) => {
    return (
        <div>
            <h3>{props.title1}</h3>
            <h3>{props.title2}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.arrForTodolist.map(m => {
                    return (
                        <li><input type="checkbox" checked={m.isDone}/><span>{m.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}