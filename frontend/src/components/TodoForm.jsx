import axios from "axios";
import React, { useState } from "react";

const TodoForm = ({onToAdded}) => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Handler to check the changes in the input field
  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };

  const postTodo = async () => {
    try {
      await axios.post(`${BASE_URL}/todo/`, newTodo);
      setNewTodo({ body: "" });
      setError(null);

      if (onToAdded){
        onToAdded(); // Notify the parent component of the recent changes
      }
    } catch (error) {
      setError("Failed to add the task.");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center space-x-4  justify-center">
      <input
        type="text"
        placeholder="Add a new task"
        className="input input-bordered input-info w-full max-w-md px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onChange={handleChange}
        value={newTodo.body}
        onKeyDown={(e) => {
          if (e.key === 'Enter'){
            postTodo()
          }
        }}
      /> 
      <button
        onClick={postTodo}
        className="btn bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 shadow-md"
      >
        Add Todo
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TodoForm;
