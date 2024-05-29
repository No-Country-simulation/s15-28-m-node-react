import { Router } from 'express'
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from '../controllers/project.controller'

const router = Router()

router.post('/', createProject)
router.get('/', getProjects)
router.get('/:id', getProjectById)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

export { router }
