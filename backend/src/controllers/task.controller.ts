import { Request, Response } from 'express';
import { Task } from '../models/tasks.model';
import { Op } from 'sequelize';

export async function createTask(req: Request, res: Response) {
  try {
    const task = req.body;
    if (!task) {
      return res.status(400).json({ message: 'existe algun error en lo datos de las tareas' })
    }
    const newtask = await Task.create(task)
    return res.status(201).json({ message: 'tarea creada exitosamente', newtask })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: 'Ocurrio un error desconocido' });
  }
}
export async function getAllTasks(_req: Request, res: Response) {
  try {
    const getalltask = await Task.findAll()
    res.status(200).json({
      message: 'Se traen todas las tareas correctamente',
      data: getalltask
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    } else {
      return res.status(400).json({ message: 'Ocurrio un error desconocido' })
    }
  }
}
export async function getTaskById(req: Request, res: Response) {
  try {
    const getByIdtask = await Task.findByPk(req.params.id);
    if (!getByIdtask) return res.status(404).json({ message: "task not found" });
    return res.status(201).json({
      message: "Te Traes la tarea por id", data: getByIdtask,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    } else {
      return res.status(400).json({ message: 'Ocurrio un error desconocido' })
    }
  }
}
export async function searchTasks(req: Request, res: Response) {
  try {
    const { name } = req.query;
    const searchtask = await Task.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return res.json({
      message: 'buscado correctamente',
      data: searchtask
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    } else {
      return res.status(400).json({ message: 'Ocurrio un error desconocido' })
    }
  }
}
export async function updateTask(req: Request, res: Response) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'no existe la tarea buscada', task })
    const updateTask = await task.update(req.body)
    return res.status(201).json({ message: 'la tarea fue actualizada', updateTask })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    } else {
      return res.status(400).json({ message: 'Ocurrio un error desconocido' })
    }
  }
}
export async function disableTask(req: Request, res: Response) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'la tarea no existe', task });
    const deletedTask = await task.update({ isactive: false })
    return res.status(201).json({ message: 'la tarea fue eliminada correctamente', deletedTask });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(400).json({ message: 'Ocurrio un error desconocido' });
    }
  }
}
export async function deleteTask(req: Request, res: Response) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'la tarea no existe', task });
    const deletedTask = await task.destroy(req.body)
    return res.status(201).json({ message: 'la tarea consultada fue eliminada correctamente', deletedTask })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(400).json({ message: 'Ocurrio un error desconocido' });
    }
  }
}

