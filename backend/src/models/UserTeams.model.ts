import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { User } from './users.model'
import { Team } from './teams.model'

const { UUID } = DataTypes

export const UserTeam = sequelize.define(
  'user_teams',
  {
    user_uuid: {
      type: UUID,
      references: {
        model: User,
        key: 'uuid',
      },
      primaryKey: true,
    },
    team_uuid: {
      type: UUID,
      references: {
        model: Team,
        key: 'uuid',
      },
      primaryKey: true,
    },
  },
  {
    tableName: 'user_teams',
    timestamps: false,
  }
)
