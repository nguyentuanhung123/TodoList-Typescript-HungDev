import React, { useState } from 'react'


interface TaskInputProps {
    addTodo: (name: string, description: string) => void
}

const TaskInput = (props: TaskInputProps) => {

    const { addTodo } = props

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const onChangeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setName(value)
    }

    const onChangeInputDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setDescription(value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addTodo(name, description);
        setName('')   
        setDescription('')
    }

    return (
        <div>
            <h1>To do list typescript</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='enter name here' value={name} onChange={onChangeInputName}/>
                <input type='text' placeholder='enter description here' value={description} onChange={onChangeInputDescription}/>
                <button type='submit'>'➕'</button>
            </form>
        </div>
    )
}

export default TaskInput