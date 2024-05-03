import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

import { Todo } from '../../@types/todo.type';
import { useEffect, useState } from 'react';

const TodoList = () => {

    const [todos, setTodos] = useState<Todo[]>([]);

    const doneTodos = todos.filter((todo) => todo.done);

    const notdoneTodos = todos.filter((todo) => !todo.done);

    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)  // đang ở chế độ Add nên xét là null

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

    const deleteTodo = (id: string) => {
        const handleDelete = (todosObj: Todo[]) => {
            const findIndexTodo = todosObj.findIndex((todo) => todo.id === id)
            if (findIndexTodo > -1) {
                const result = [...todosObj]
                result.splice(findIndexTodo, 1)
                return result;
            }
            return todosObj
        }
        setTodos(handleDelete);
    }

    const startEditTodo = (id: string) => {
        const findedTodo = todos.find((todo) => todo.id === id);
        //do findedTodo có kiểu dữ liệu là Todo hoặc undifined nên nếu chỉ để setCurrentTodo(findedTodo) sẽ không đúng do currentTodo có kiểu dữ liệu là Todo hoặc null
        if (findedTodo) {
            setCurrentTodo(findedTodo);//ta phải để findedTodo trong if để findedTodo lúc nào cũng sẽ có giá trị => đảm bảo về mặt typescript
        }
    }

    const editTodoName = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) return { ...prev, name }
            return null
        })

    }

    const editTodoDescription = (description: string) => {
        setCurrentTodo((prev) => {
            if (prev) return { ...prev, description }
            return null
        })
    }

    const finishEditTodo = () => {
        const handleEdit = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                //phải có dấu ? vì currentTodo có trường hợp currentTodo là null (hoặc để (currentTodo as Todo).id) => return currentTodo as Todo
                // node : sau khi ta viết xong currentTodo.id ta phải gõ Enter để nó tự có thể thêm dấu ?
                if (todo.id === currentTodo?.id) {
                    return currentTodo
                }
                return todo
            })
        }
        setTodos(handleEdit);
        setCurrentTodo(null);
    }

    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodoName={editTodoName} editTodoDescription={editTodoDescription} finishEditTodo={finishEditTodo}/>
                <TaskList todos={notdoneTodos} doneTaskList={false} handleDoneTodo = {handleDoneTodo} deleteTodo={deleteTodo} startEditTodo={startEditTodo}/>
                <TaskList todos={doneTodos} doneTaskList={true} handleDoneTodo = {handleDoneTodo} deleteTodo={deleteTodo} startEditTodo={startEditTodo}/>
            </div>
        </div>
    )
}

export default TodoList