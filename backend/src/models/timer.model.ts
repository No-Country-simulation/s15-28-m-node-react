import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { Task } from './tasks.model'

const { UUID, UUIDV4, TIME } = DataTypes

export const Timer = sequelize.define(
  'timers',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
    total_time: {
      type: TIME,
    },
    task_uuid: {
      type: UUID,
      references: {
        model: Task,
        key: 'UUID',
      },
    },
  },
  {
    tableName: 'timers',
    timestamps: false,
  }
)

Timer.belongsTo(Task, { foreignKey: 'task_uuid' })
