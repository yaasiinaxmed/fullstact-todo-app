import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useFirebase } from "../context/firebase";
import AddTodo from "../Components/AddTodo";
import Todo from "../Components/Todo";

import vector from "../assets/vector.jpg";
import { IoIosListBox } from "react-icons/io";

function Home() {
  const [currentTodos, setCurrentTodos] = useState(null);
  const { user, logOut, todos, toggleComplete, deleteTodo } = useFirebase();

  useEffect(() => {
    const myTodos = todos.filter((todo) => todo.userId === user.uid);
    setCurrentTodos(myTodos);
  }, [todos]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between w-full bg-[#CF4358] p-4 sm:p-8">
        <div className="flex items-center justify-center gap-4">
          <figure className="flex items-center justify-center w-14 sm:w-16 object-cover object-center rounded-full overflow-hidden p-[4px] bg-white">
            <img
              src={user.photoURL === null ? vector : user.photoURL}
              alt=""
              className="w-full h-full rounded-full"
            />
          </figure>
          <h1 className="font-bold text-xl sm:text-3xl text-white">
            {user.displayName === null
              ? user.email.slice(0, 9) + "..."
              : user.displayName}{" "}
          </h1>
        </div>
        <button
          onClick={logOut}
          className="bg-[#222c3a] text-white rounded flex items-center justify-center px-4 py-3 gap-3 "
        >
          <BiLogOut /> Log Out
        </button>
      </div>
      <div className="container mx-auto flex flex-col items-center px-4">
        <AddTodo />
        <ul className="w-full flex items-center mt-5 flex-col gap-3">
          {todos.length === 0 ? (
            <div className="flex gap-3 items-center justify-center ">
              <span className="w-8 h-8 rounded-full border-[3px] border-[#cf4358] border-l-slate-200 animate-spin"></span>{" "}
              <h2 className="font-medium uppercase text-lg">Loading...</h2>
            </div>
          ) : (
            <>
              {currentTodos === null ? (
                <div className="flex gap-3 items-center justify-center ">
                  <span className="w-8 h-8 rounded-full border-[3px] border-[#cf4358] border-l-slate-200 animate-spin"></span>{" "}
                  <h2 className="font-medium uppercase text-lg">Loading...</h2>
                </div>
              ) : (
                <>
                  {currentTodos.length === 0 ? (
                    <div className="flex flex-col gap-4 items-center justify-center">
                      <span className="text-6xl text-[#cf4358]"><IoIosListBox /></span>
                      <h1 className="font-medium uppercase">Todo is empty...</h1>
                    </div>
                  ) : (
                    <>
                      {currentTodos.map((todo) => (
                        <Todo
                          key={todo.id}
                          todo={todo}
                          toggleComplete={toggleComplete}
                          deleteTodo={deleteTodo}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
