import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { User } from './users.model'
import { TeamInfo } from './teamInfo.model'

const { UUID, UUIDV4 } = DataTypes

export const Team = sequelize.define(
  'teams',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    user_uuid: {
      type: UUID,
      references: {
        model: User,
        key: 'UUID',
      },
      onDelete: 'CASCADE',
    },
    team_uuid: {
      type: UUID,
      references: {
        model: TeamInfo,
        key: 'UUID',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'teams',
    timestamps: false,
  }
)

Team.belongsTo(User, { foreignKey: 'user_uuid' })
Team.belongsTo(TeamInfo, { foreignKey: 'team_uuid' })
