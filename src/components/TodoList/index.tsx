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

    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput addTodo={addTodo}/>
                <TaskList todos={notdoneTodos}/>
                <TaskList todos={doneTodos}/>
            </div>
        </div>
    )
}

export default TodoList