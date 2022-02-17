import mongoose from 'mongoose';

const Schema = mongoose.Schema

const taskSchema = new Schema({
        email: String,
        username: String,
        password: String,
    },
    { timestamps: true },
)

var Task = mongoose.model('Task', taskSchema);

export default Task;