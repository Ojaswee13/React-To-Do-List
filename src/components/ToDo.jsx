import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems';

const ToDo = () => {

  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const [darkMode, setDarkMode] = useState(false);

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false
    }
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      add();
    }
  }

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id)
    })
  }

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete }
        }
        return todo;
      })
    })
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList])

  const completedCount = todoList.filter((todo) => todo.isComplete).length;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-800 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-137.5 rounded-xl">

        <div className="flex items-center mt-7 gap-2">
          <img className="w-8" src={todo_icon} alt="Todo icon" />
          <h1 className="text-3xl font-semibold dark:text-white">To Do List</h1>
          {todoList.length - completedCount > 0 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
              {todoList.length - completedCount} left
            </span>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-auto text-2xl cursor-pointer bg-transparent border-none"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className='flex items-center my-7 bg-gray-200 dark:bg-gray-700 rounded-full'>
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-4 placeholder:text-slate-600 dark:placeholder:text-slate-400 dark:text-white'
            type="text"
            placeholder='Add your tasks'
          />
          <button
            onClick={add}
            className='border-none rounded-full bg-orange-600 w-32 h-14 text-white font-lg font-medium cursor-pointer'
          >
            ADD+
          </button>
        </div>

        {todoList.length > 0 && (
          <>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              {completedCount} of {todoList.length} {todoList.length === 1 ? "task" : "tasks"} completed
            </p>
            <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-orange-600 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / todoList.length) * 100}%` }}
              ></div>
            </div>
          </>
        )}

        <div>
          {todoList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <p className="text-4xl mb-3">📝</p>
              <p className="text-sm font-medium">No tasks yet. Add one above!</p>
            </div>
          ) : (
            todoList.map((items) => {
              return <TodoItems key={items.id} text={items.text} id={items.id}
                isComplete={items.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
            })
          )}
        </div>

      </div>
    </div>
  )
}

export default ToDo;