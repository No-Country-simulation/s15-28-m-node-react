import { Request, Response } from "express";
import { TeamInfo } from "../models/teamInfo.model";

export class TeamInfoController {
  static async getAllTeams(_req: Request, res: Response): Promise<void> {
    try {
      const teams = await TeamInfo.findAll();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: "Error fetching teams", error });
    }
  }

  static async getTeamById(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;
    try {
      const team = await TeamInfo.findByPk(uuid);
      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ message: "Team not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching team", error });
    }
  }

  static async createTeam(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;
    try {
      const newTeam = await TeamInfo.create({ name, description });
      res.status(201).json(newTeam);
    } catch (error) {
      res.status(500).json({ message: "Error creating team", error });
    }
  }

  static async updateTeam(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;
    const { name, description } = req.body;
    try {
      const team = await TeamInfo.findByPk(uuid);
      if (team) {
        await team.update({ name, description });
        res.status(200).json(team);
      } else {
        res.status(404).json({ message: "Team not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating team", error });
    }
  }

  static async deleteTeam(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;
    try {
      const team = await TeamInfo.findByPk(uuid);
      if (team) {
        await team.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Team not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting team", error });
    }
  }
}
