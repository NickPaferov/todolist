import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {
    let arrForTodolist1=[
        {id:1, title:'HTML&CSS', isDone:false},
        {id:2, title:'JS', isDone:true},
        {id:3, title:'React', isDone:false},
    ]

    let arrForTodolist2=[
        {id:1, title:'HTML&CSS22222', isDone:true},
        {id:2, title:'JS22222', isDone:false},
        {id:3, title:'React222222', isDone:true},
    ]

    return (
        <div className="App">
            <Todolist title1={"What to learn11111"} arrForTodolist={arrForTodolist1}/>
            <Todolist title2={"What to learn22222"} arrForTodolist={arrForTodolist2}/>
        </div>
    );
}

export default App;
