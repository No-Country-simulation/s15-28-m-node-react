import { Router } from 'express'
import { createRoles, getRoles } from '../controllers/example.controller'

const router = Router()

router.get('/roles/', getRoles)
router.post('/roles/', createRoles)

export default router
