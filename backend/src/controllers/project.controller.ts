import { Request, Response } from 'express'
import { Project } from '../models/project.model'
import { optionalFieldBody, requeriedFieldsBody } from '../utils/helpers'

export async function createProject(req: Request, res: Response) {
  try {
    const { body } = req

    const [error, message] = requeriedFieldsBody({
      body: body,
      model: Project,
      excludedFields: ['uuid'],
    })

    if (error !== 200) return res.status(error).json(message)

    body.uuid = crypto.randomUUID()
    const project = await Project.create(body)
    return res.status(201).json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getProjects(_req: Request, res: Response) {
  try {
    const projects = await Project.findAll()
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    return res.status(200).json(project)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { body } = req
    const [error, message] = optionalFieldBody({
      body: body,
      model: Project,
      excludedFields: ['uuid'],
    })

    if (error !== 200) return res.status(error).json(message)

    await Project.update(body, { where: { id } })

    const updatedProject = await Project.findByPk(id)

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' })
    }

    return res.status(200).json(updatedProject)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } })
    if (deleted) {
      return res.status(204).json()
    }
    return res.status(404).json({ message: 'Project not found' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
