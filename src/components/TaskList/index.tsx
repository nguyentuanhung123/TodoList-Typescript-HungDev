import { useState } from 'react'
import PropTypes from 'prop-types';

import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype';

import styles from './taskList.module.scss'

interface TaskListProps {
    todos: Todo[]
    doneTaskList: boolean
    handleDoneTodo: (id: string, done: boolean) => void
    deleteTodo: (id: string) => void
    startEditTodo: (id: string) => void
}

const TaskList = (props: TaskListProps) => {

    const { todos, doneTaskList, handleDoneTodo, deleteTodo, startEditTodo } = props;

    return (
        <div className='mb-2'>
            <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
            <div className={styles.tasks}>
                {
                    todos.map((todo) => {
                        return (
                            <div className={styles.task} key={todo.id}>
                                <input 
                                    type='checkbox' 
                                    className={styles.taskCheckbox} 
                                    checked={todo.done} 
                                    onChange={(event) => handleDoneTodo(todo.id, event.target.checked)}
                                />
                                <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name} - {todo.description}</span>
                                <div className={styles.taskActions}>
                                    <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>🖊️</button>
                                    <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>✖️</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TaskList

TaskList.propTypes = {
    doneTaskList: PropTypes.bool,
    todos: PropTypes.arrayOf(
        TodoTypes
    ),
    handleDoneTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
}