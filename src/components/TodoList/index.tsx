import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

import { Todo } from '../../@types/todo.type';
import { useEffect, useState } from 'react';

const TodoList = () => {

    const [todos, setTodos] = useState<Todo[]>([]);

    const doneTodos = todos.filter((todo) => todo.done);

    const notdoneTodos = todos.filter((todo) => !todo.done);

    const addTodo = (name: string, description: string) => {
        const todo: Todo = {
            name, 
            description,
            done: false,
            id: new Date().toISOString()
        }

        const handleAdd = (todosObj: Todo[]) => {
            return [...todosObj, todo]
        }

        setTodos(handleAdd)
    }

    const handleDoneTodo = (id: string, done: boolean) => {
        const handler = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                if (todo.id === id) return { ...todo, done }
                return todo
            })
        }
        setTodos(handler);
    }

    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput addTodo={addTodo}/>
                <TaskList todos={notdoneTodos} doneTaskList={false} handleDoneTodo = {handleDoneTodo}/>
                <TaskList todos={doneTodos} doneTaskList={true} handleDoneTodo = {handleDoneTodo}/>
            </div>
        </div>
    )
}

export default TodoList