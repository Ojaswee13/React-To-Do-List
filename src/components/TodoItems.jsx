import React from 'react'
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png'

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className={`flex items-center my-3 gap-2 p-2 rounded-lg transition-colors ${isComplete ? "bg-orange-50 dark:bg-orange-900/20" : ""}`}>
      <div onClick={() => { toggle(id) }} className='cursor-pointer flex flex-1 items-center'>
        <img src={isComplete ? tick : not_tick} alt="" className='w-7' />
        <p className={`ml-3 text-slate-700 dark:text-slate-200 font-medium text-[17px] decoration-slate-800 ${isComplete ? "line-through" : ""}`}>{text}</p>
      </div>
      <img onClick={() => { deleteTodo(id) }} src={delete_icon} alt="" className='w-4 cursor-pointer' />
    </div>
  )
}

export default TodoItems