import { appBarClasses } from '@mui/material';
import express from 'express';

import Task from '../models/task.js';

const router = express.Router();
const app = express();

export const getTasks = async (req, res) => { 
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTask = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Task.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    const { email, username, password } = req.body;

    const newTask = new Task({
        email,
        username,
        password
    });

    //const newTask= new Task({ email, username, password })

    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await Task.findOne({ username, password }).lean();
    const token = createToken(user._id, user.username);
    try {
        // const token = createToken(user._id, user.username);
        res.cookie(token)
        res.status(200).json({userID: user._id});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

export const userLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await Task.findOne({ username, password }).lean();
    //const token = createToken(user._id, user.username);
    if (password === user.password) {
        try {
           // const token = createToken(user._id, user.username);
           // res.cookie('jwt', token, {maxAge: maxAge * 1000})
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

export default router;