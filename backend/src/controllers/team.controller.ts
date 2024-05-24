import { Request, Response } from 'express'
import { User } from '../models/users.model'
import { Team } from '../models/teams.model'
import { UserTeam } from '../models/userTeams.model'

export class TeamController {
  static async getAllTeams(_req: Request, res: Response): Promise<void> {
    try {
      const teams = await Team.findAll({ include: [User, UserTeam] })
      res.status(200).json(teams)
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving teams', error })
    }
  }

  static async getTeamById(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params
    try {
      const team = await Team.findByPk(uuid, { include: [User, UserTeam] })
      if (team) {
        res.status(200).json(team)
      } else {
        res.status(404).json({ message: 'Team not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving the team', error })
    }
  }

  static async createTeam(req: Request, res: Response): Promise<void> {
    const { user_uuid, team_uuid } = req.body
    try {
      const newTeam = await Team.create({ user_uuid, team_uuid })
      res.status(201).json(newTeam)
    } catch (error) {
      res.status(500).json({ message: 'Error creating the team', error })
    }
  }

  static async updateTeam(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params
    const { user_uuid, team_uuid } = req.body
    try {
      const team = await Team.findByPk(uuid)
      if (team) {
        await team.update({ user_uuid, team_uuid })
        res.status(200).json(team)
      } else {
        res.status(404).json({ message: 'Team not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating the team', error })
    }
  }

  static async deleteTeam(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params
    try {
      const team = await Team.findByPk(uuid)
      if (team) {
        await team.destroy()
        res.status(204).send()
      } else {
        res.status(404).json({ message: 'Team not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting the team', error })
    }
  }
}
