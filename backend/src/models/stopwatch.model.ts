import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { Task } from './tasks.model'

const { UUID, UUIDV4 } = DataTypes

export const Stopwatch = sequelize.define(
  'stopwatches',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    init_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    total_date: {
      type: DataTypes.TIME,
    },
    task_id: {
      type: UUID,
      references: {
        model: Task,
        key: 'uuid',
      },
    },
  },
  {
    tableName: 'stopwatches',
    timestamps: false,
  }
)
