import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import Table from "./components/Table";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
    console.log(todos);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      // console.log(response);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  };

  const handleTodoAdded = () => {
    fetchData();
  }

  return (
    <div className="bg-teal-400 min-h-screen px-8">
      <header className="pt-8">
        <h1 className="text-5xl font-bold text-center pb-12 text-gray-800">
          To-Do List
        </h1>
      </header>
      <main className="space-y-6">
        <TodoForm onToAdded={handleTodoAdded} />
        <Table todos={todos} setTodos={setTodos} isLoading={isLoading}/>
      </main>
    </div>
  );
};

export default App;
