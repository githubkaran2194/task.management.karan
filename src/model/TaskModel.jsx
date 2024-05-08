import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;
