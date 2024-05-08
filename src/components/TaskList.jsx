'use client'
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentYear = new Date().getFullYear();
    const currentDate = format(new Date(), "PPP");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/api/tasks");
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const data = await response.json();
            setTasks(data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE'
            });
            toast("deleted task", response)
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            fetchTasks();
        } catch (error) {
            toast.error("Error deleting task:", error);
        }
    };

    return (
        <div className="w-full mx-auto p-5">
            <div className="flex justify-between  items-center px-7">
                <h2 className="text-xl font-semibold mb-4">Task List ({currentYear})</h2>
                <button
                    onClick={fetchTasks}
                    disabled={isLoading}
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isLoading ? "Loading..." : "Refresh"}
                </button>
                {error && <p className="text-red-500">Error: {error}</p>}
                <p><b>Date</b>: {currentDate}</p>
            </div>
            {tasks.length === 0 ? <p className="text-center my-8 text-2xl font-bold">Tasks is empty</p> : <p className="text-center my-8 text-2xl font-bold">Tasks {tasks.length}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" data-aos="fade-left" aos-duration="5s">
                {tasks.map((task, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">{task.task}</h3>
                        <p className="text-gray-600 mb-2">{task.description}</p>
                        <p><b>createdAt </b>: {format(new Date(task.createdAt), "PPPp")}</p>
                        <br />
                        <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 w-full">Delete</button>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default TaskList;
