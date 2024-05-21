import { Request, Response } from 'express';
import { Project } from '../models/project.model';
import { Status } from '../models/status.model';
import { User } from '../models/users.model';

export class ProjectController {
    static async createProject(req: Request, res: Response) {
        const {
            start_date,
            end_date,
            name,
            hourly_rate,
            description,
            client_id,
            isCompleted,
            isActive,
            status_id,
            user_id,
            team_id,
        } = req.body;

        try {
            // Verificar si el cliente existe
            const client = await User.findByPk(client_id);
            if (!client) {
                return res.status(404).json({ message: "Client not found" });
            }

            // Verificar si el status existe
            const status = await Status.findByPk(status_id);
            if (!status) {
                return res.status(404).json({ message: "Status not found" });
            }

            // Crear el proyecto
            const project = await Project.create({
                start_date,
                end_date,
                name,
                hourly_rate,
                description,
                client_id,
                isCompleted,
                isActive,
                status_id,
                user_id,
                team_id,
            });

            return res.status(201).json(project);
        } catch (error) {
            console.error("Error creating project:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getProjects(_req: Request, res: Response) {
        try {
            const projects = await Project.findAll();
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getProjectById(req: Request, res: Response) {
        try {
            const project = await Project.findByPk(req.params.id);
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }
            return res.status(200).json(project);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateProject(req: Request, res: Response) {
        try {
            const [updated] = await Project.update(req.body, {
                where: { id: req.params.id },
            });
            if (updated) {
                const updatedProject = await Project.findByPk(req.params.id);
                return res.status(200).json(updatedProject);
            }
            return res.status(404).json({ message: "Project not found" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteProject(req: Request, res: Response) {
        try {
            const deleted = await Project.destroy({ where: { id: req.params.id } });
            if (deleted) {
                return res.status(204).json();
            }
            return res.status(404).json({ message: "Project not found" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
