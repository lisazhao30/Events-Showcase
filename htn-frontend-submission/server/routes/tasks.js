import express from 'express';

import { getTasks, getTask, createTask, userLogin } from '../controller/tasks.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.post('/login', userLogin);

export default router;