import { useState } from 'react'
import PropTypes from 'prop-types';

import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype';

import styles from './taskList.module.scss'

interface TaskListProps {
    todos: Todo[]
}

const TaskList = (props: TaskListProps) => {

    const { todos } = props;

    return (
        <div className='mb-2'>
            {/* <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2> */}
            <div className={styles.tasks}>
                {
                    todos.map((todo) => {
                        return (
                            <div className={styles.task} key={todo.id}>
                                {/* <input type='checkbox' className={styles.taskCheckbox} checked={todo.done}
                                    onChange={(event) => handleDoneTodo(todo.id, event.target.checked)} /> */}
                                <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>{" "}
                                <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.description}</span>
                                {/* <div className={styles.taskActions}>
                                    <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>🖊️</button>
                                    <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>✖️</button>
                                </div> */}
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
    todos: PropTypes.arrayOf(
        TodoTypes
    ),
}