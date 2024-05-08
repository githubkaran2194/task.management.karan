import Task from "@/model/TaskModel";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectDB();
    try {
        const tasks = await Task.find();
        return NextResponse.json({ success: true, message: 'Tasks fetched successfully', tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch tasks' });
    }
}

export async function POST(req) {
    let tasksReq = await req.json();
    await connectDB();
    try {

        const newTask = new Task(tasksReq);
     const result = await newTask.save();
        return NextResponse.json({ success: true, message: 'Task created successfully', task: result });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json({ success: false, message: 'Failed to create task' });
    }
}
