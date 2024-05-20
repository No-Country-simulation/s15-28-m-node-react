import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

const { STRING, TEXT, BOOLEAN } = DataTypes

export const Label = sequelize.define(
  'labels',
  {
    description: {
      type: TEXT,
    },
    color: {
      type: STRING(50),
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
    isActive: {
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'labels',
    timestamps: false,
  }
)
