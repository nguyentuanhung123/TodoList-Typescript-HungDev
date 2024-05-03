import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype'


interface TaskInputProps {
    addTodo: (name: string, description: string) => void
    currentTodo: Todo | null
    editTodoName: (name: string) => void
    editTodoDescription: (description: string) => void
    finishEditTodo: () => void
}

const TaskInput = (props: TaskInputProps) => {

    const { addTodo, currentTodo, editTodoName, editTodoDescription, finishEditTodo } = props

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const onChangeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if(currentTodo){
            editTodoName(value)
        } else {
            setName(value)
        }
    }

    const onChangeInputDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if(currentTodo){
            editTodoDescription(value)
        } else{
            setDescription(value)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(currentTodo){
            finishEditTodo()
        } else{
            addTodo(name, description);
            setName('')   
            setDescription('')
        }
    }

    return (
        <div>
            <h1>To do list typescript</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='enter name here' value={currentTodo ? currentTodo.name : name} onChange={onChangeInputName}/>
                <input type='text' placeholder='enter description here' value={currentTodo ? currentTodo.description : description} onChange={onChangeInputDescription}/>
                <button type='submit'>
                    {
                        currentTodo ? '✔️' : '➕'
                    }
                </button>
            </form>
        </div>
    )
}

export default TaskInput


TaskInput.propTypes = {
    addTodo: PropTypes.func.isRequired,
    currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
    editTodoName: PropTypes.func.isRequired,
    editTodoDescription: PropTypes.func.isRequired,
    finishEditTodo: PropTypes.func.isRequired,
}