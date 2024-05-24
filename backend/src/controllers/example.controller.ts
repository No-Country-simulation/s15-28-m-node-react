import { Role } from '../models/roles.model'
import { Request, Response } from '../utils/types'

export async function createRoles(req: Request, res: Response) {
  try {
    const { role } = req.body
    if (!role) {
      return res.status(400).json({ message: 'El rol es requerido' })
    }
    const newRole = await Role.create({ role })
    res.status(201).json(newRole)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    } else {
      return res.status(400).json({ message: 'Ocurrió un error desconocido' })
    }
  }
}

export async function getRoles(_req: Request, res: Response) {
  try {
    const roles = await Role.findAll()
    res.status(200).json(roles)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    } else {
      return res.status(400).json({ message: 'Ocurrio un error desconocido' })
    }
  }
}
