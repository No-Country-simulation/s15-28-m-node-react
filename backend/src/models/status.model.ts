import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

const { STRING } = DataTypes

export const Status = sequelize.define(
  'statuses',
  {
    color: {
      type: STRING(50),
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'statuses',
    timestamps: false,
  }
)
