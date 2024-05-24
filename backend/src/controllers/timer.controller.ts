import { Request, Response } from 'express'
import { Stopwatch } from '../models/stopwatch.model'

export async function createTimer(req: Request, res: Response) {
  try {
    const { start_time, end_time, total_time, task_uuid } = req.body
    const newTimer = await Stopwatch.create({
      start_time,
      end_time,
      total_time,
      task_uuid,
    })
    res.status(201).json(newTimer)
  } catch (error) {
    return res.status(500).json({
      message:
        'La creación del cronometro tiene un error interno en el servidor',
    })
  }
}

export async function getTimers(_req: Request, res: Response) {
  try {
    const timers = await Stopwatch.findAll()

    res.status(200).json(timers)
  } catch (error) {
    return res.status(500).json({
      message: 'El listado de cronometro tiene un error interno en el servidor',
    })
  }
}

export async function getTimerById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const timer = await Stopwatch.findByPk(id)
    if (!timer) {
      return res.status(404).json({ message: 'El cronometro no existe' })
    }
    return res.status(200).json(timer)
  } catch (error) {
    return res.status(500).json({
      message:
        'La búsqueda de cronometro por id tiene un error interno en el servidor',
    })
  }
}

export async function updateTimer(req: Request, res: Response) {
  try {
    const id = req.params.id
    const body = req.body
    const [updated] = await Stopwatch.update(body, {
      where: { uuid: id },
    })
    if (updated) {
      const updatedUser = await Stopwatch.findByPk(id)
      if (updatedUser == null) {
        return res
          .status(404)
          .json({ message: 'Usuario no se pudo actualizar.' })
      }
      return res.status(200).json(updatedUser)
    }
    return res
      .status(404)
      .json({ message: 'El cronometro no se pudo actualizar.' })
  } catch (error) {
    return res.status(500).json({
      message:
        'La actualización del usuario tiene un error interno del Servidor.',
    })
  }
}

export async function deleteTimer(req: Request, res: Response) {
  try {
    const { id } = req.params
    const deletedRole = await Stopwatch.destroy({ where: { id } })
    if (deletedRole === 1)
      return res.status(200).json({ message: 'El cronometro fue eliminado.' })
    return res
      .status(400)
      .json({ message: 'El cronometro no se pudo eliminar' })
  } catch (error) {
    console.error('Error creating project:', error)
    return res.status(500).json({
      message:
        'La eliminación del cronometro tiene un error interno en el servidor',
    })
  }
}
