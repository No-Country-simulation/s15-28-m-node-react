import express from 'express';
import {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  disableTask,
  searchTasks,
  deleteTask,
  
} from '../controllers/task.controller';

const router = express.Router();

router.post('/tasks', createTask);
router.get('/alltasks', getAllTasks);
router.get('/tasks/search', searchTasks);
router.get('/tasks/:id', getTaskById);
router.patch('/tasks/:id', updateTask);
router.patch('/tasks/disable/:id', disableTask);
router.delete('/tasks/:id', deleteTask)

export default router;
