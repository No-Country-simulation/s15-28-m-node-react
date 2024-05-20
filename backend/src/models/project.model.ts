import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { User } from './users.model'
import { Status } from './status.model'

const { UUID, UUIDV4, STRING, DATEONLY, DECIMAL, TEXT, BOOLEAN, INTEGER } =
  DataTypes

export const Project = sequelize.define(
  'projects',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    start_date: {
      type: DATEONLY,
    },
    end_date: {
      type: DATEONLY,
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
    hourly_rate: {
      type: DECIMAL(10, 2),
    },
    description: {
      type: TEXT,
    },
    client_id: {
      type: UUID,
      references: {
        model: User,
        key: 'UUID',
      },
    },
    isCompleted: {
      type: BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: BOOLEAN,
      defaultValue: true,
    },
    status_id: {
      type: INTEGER,
      references: {
        model: Status,
        key: 'id',
      },
    },
    user_id: {
      type: UUID,
      allowNull: false,
    },
    team_id: {
      type: UUID,
    },
  },
  {
    tableName: 'projects',
    timestamps: false,
  }
)

Project.belongsTo(Status, { foreignKey: 'status_id' })
Project.belongsTo(User, { foreignKey: 'client_id' })
