import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

const { UUID, UUIDV4, STRING, TEXT } = DataTypes

export const TeamInfo = sequelize.define(
  'teaminfo',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
    description: {
      type: TEXT,
    },
  },
  {
    tableName: 'teaminfo',
    timestamps: false,
  }
)
