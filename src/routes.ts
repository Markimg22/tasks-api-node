import { Router } from 'express';

import { registerUserController } from './controller/register-user-controller';
import { loginUserController } from './controller/login-user-controller';
import { createTaskController } from './controller/create-task-controller';
import { authMiddleware } from './middleware/auth-middleware';
import { updateTaskController } from './controller/update-task-controller';
import { deleteTaskController } from './controller/delete-task-controller';
import { getTasksController } from './controller/get-tasks-controller';

export const router = Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post('/task', authMiddleware, createTaskController);
router.patch('/task/:taskId', authMiddleware, updateTaskController);
router.delete('/task/:taskId', authMiddleware, deleteTaskController);
router.get('/tasks', authMiddleware, getTasksController);
