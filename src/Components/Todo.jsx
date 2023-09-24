import React from 'react'
import {RiCheckboxBlankCircleLine, RiCheckboxCircleLine} from 'react-icons/ri'
import {IoIosTrash} from 'react-icons/io'

function Todo({todo, toggleComplete, deleteTodo}) {
  return (
    <li className='w-full md:w-1/2 flex justify-between p-5 shadow-[0px_0px_5px_rgb(0,0,0,0.1)] text-2xl rounded'>
        <div onClick={() => toggleComplete(todo)} className='flex items-center gap-2 cursor-pointer'>
            <span className='text-[#38c23f]'>{!todo.completed ? <RiCheckboxBlankCircleLine/> : <RiCheckboxCircleLine/>}</span>
            <span className={`text-xl ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
        </div>
        <button className='text-[#ff0000a8]' onClick={() => deleteTodo(todo.id)}><IoIosTrash/></button>
    </li>
  )
}

export default Todo