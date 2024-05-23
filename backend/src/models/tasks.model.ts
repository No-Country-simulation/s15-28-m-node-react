import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

const { UUID, UUIDV4, STRING, DATEONLY, TIME, BOOLEAN } = DataTypes

export const Task = sequelize.define(
  'tasks',
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
    duration: {
      type: TIME,
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
    iscompleted: {
      type: BOOLEAN,
      defaultValue: false,
    },
    isactive: {
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'tasks',
    timestamps: false,
  }
)
