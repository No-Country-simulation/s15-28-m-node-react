import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

const { STRING } = DataTypes

export const Role = sequelize.define(
  'roles',
  {
    role: {
      type: STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'roles',
    timestamps: false,
  }
)
