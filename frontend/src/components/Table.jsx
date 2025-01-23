import React, { useState } from "react";
import axios from "axios";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
} from "react-icons/md";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="mt-4">{children}</div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Loader = () => (
  <div className="flex justify-center items-center py-4">
    <div className="w-8 h-8 border-4 border-indigo-500 border-solid rounded-full border-t-transparent animate-spin"></div>
    <span className="ml-4 text-indigo-500 text-sm font-medium">
      Loading data, please wait...
    </span>
  </div>
);

const Table = ({ todos, setTodos, isLoading }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editBody, setEditBody] = useState("");

  const openDeleteModal = (todo) => {
    setSelectedTodo(todo);
    setDeleteModalOpen(true);
  };

  const openEditModal = (todo) => {
    setSelectedTodo(todo);
    setEditBody(todo.body);
    setEditModalOpen(true);
  };

  const closeModals = () => {
    setSelectedTodo(null);
    setDeleteModalOpen(false);
    setEditModalOpen(false);
  };

  const handleDeleteTodo = async () => {
    if (!selectedTodo) return;

    try {
      await axios.delete(`${BASE_URL}/todo/${selectedTodo.id}/`);
      setTodos(todos.filter((todo) => todo.id !== selectedTodo.id));
      closeModals();
    } catch (error) {
      console.error("Failed to delete the todo:", error);
    }
  };

  const handleEditTodo = async () => {
    if (!selectedTodo) return;

    try {
      const response = await axios.patch(
        `${BASE_URL}/todo/${selectedTodo.id}/`,
        { body: editBody }
      );
      setTodos(
        todos.map((todo) =>
          todo.id === selectedTodo.id ? response.data : todo
        )
      );
      closeModals();
    } catch (error) {
      console.error("Failed to edit the todo:", error);
    }
  };

  const handleCheckbox = async (id, completed) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/todo/${id}/`,
        { completed: !completed }
      );
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Failed to update checkbox:", error);
    }
  };

  return (
    <div className="py-4 flex justify-center w-full">
      <table className="w-11/12 max-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-4 text-sm font-semibold tracking-wide text-left">
              CHECKBOX
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-left">
              TO-DO
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-left">
              START TIME
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-left">
              END TIME
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-left">
              EXPECTED START DATE
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-left">
              STATUS
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-left">
              DATE-CREATED
            </th>
            <th className="p-4 text-sm font-semibold tracking-wide text-left">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8">
                <Loader />
              </td>
            </tr>
          ) : todos.length > 0 ? (
            todos.map((todo) => (
              <tr
                key={todo.id}
                className="border-t border-gray-200 hover:bg-gray-100 border-b"
              >
                <td className="p-4">
                  <span
                    onClick={() => handleCheckbox(todo.id, todo.completed)}
                    className="inline-block cursor-pointer text-lg text-green-600"
                  >
                    {todo.completed ? (
                      <MdOutlineCheckBox />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank />
                    )}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-800">{todo.body}</td>
                <td className="p-4 text-sm text-gray-600">
                  {todo.from_time || "N/A"}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {todo.to_time || "N/A"}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(todo.task_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4">
                  <span
                    className={`p-1.5 text-xs font-medium tracking-wider rounded ${
                      todo.completed
                        ? "bg-green-300 text-green-800"
                        : "bg-red-300 text-red-800"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Incomplete"}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(todo.created).toLocaleString()}
                </td>
                <td className="p-4 text-sm font-medium flex items-center space-x-4">
                  <span
                    className="cursor-pointer text-xl text-blue-600"
                    onClick={() => openEditModal(todo)}
                  >
                    <MdEditNote />
                  </span>
                  <span
                    className="cursor-pointer text-xl text-red-600"
                    onClick={() => openDeleteModal(todo)}
                  >
                    <MdOutlineDeleteOutline />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        title="Confirm Deletion"
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={closeModals}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleDeleteTodo}
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeModals} title="Edit To-Do">
        <input
          type="text"
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded" 
          placeholder="Edit task..."
        />
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleEditTodo}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
