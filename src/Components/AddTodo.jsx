import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useFirebase } from "../context/firebase";

function AddTodo() {
  const {addTodo} = useFirebase();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()

    if(text === '') {
        alert("Please Enter Validate")
        return
    }

    addTodo(text)

    setText('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full md:w-1/2 gap-3"
    >
      <input
        type="text"
        placeholder="Enter todo"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="rounded outline-none w-full p-3 border focus:border-[#cf4258]"
      />
      <button type="submit" className="p-3 bg-[#cf4258] text-white text-2xl rounded">
        <AiOutlinePlus />
      </button>
    </form>
  );
}

export default AddTodo;
