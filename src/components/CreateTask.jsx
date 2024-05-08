'use client'
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskForm = () => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { task, description };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URI}/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });
            const data = await response.json();
            toast.success("task added successfully")
            console.log(data);
            setTask('');
            setDescription('');
            router.push('/')
        } catch (error) {
            toast.error('Error adding task:', error);
        }
    };

    return (
        <div className="w-[80%] mx-auto mt-5 bg-slate-200 rounded-lg overflow-hidden shadow-lg p-3 py-8">
        <Head>
    <title title="Task Mangement" name="title" content="Task Management">Task Management</title>
    <meta name="description" content="Your description here" />
</Head>
            <h2 className='font-bold text-center text-xl'>Add Task</h2>
            <form onSubmit={handleSubmit} className="px-7  space-y-4" data-aos="fade-up" >
                <div>
                    <label htmlFor="task" className="block text-gray-700 font-bold">Task:</label>
                    <input
                        type="text"
                        id="task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter your task"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-bold">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter your description"
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600">Add Task</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default TaskForm;
