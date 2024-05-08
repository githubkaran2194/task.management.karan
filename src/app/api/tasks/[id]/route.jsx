import Task from "@/model/TaskModel";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    await connectDB();
    const { id } = params;
    let success = false;
    let data;
    try {
       
        const deleteResult = await Task.deleteOne({ _id: id });
        if (deleteResult.deletedCount > 0) {
            success = true;
            console.log("Deleted successfully");
        } else {
            console.log("Task not found");
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.error("Internal Server Error", { status: 500 });
    }

    return NextResponse.json({ success, data }, { status: 200 });
}

export async function GET(req, { params }) {
    await connectDB();
    const { id } = params;
    let data;
    try {
  
        data = await Task.findOne({ _id: id });
        console.log("Data:", data);
    } catch (error) {
        console.error("Error fetching task:", error);
        return NextResponse.error("Internal Server Error", { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
}
