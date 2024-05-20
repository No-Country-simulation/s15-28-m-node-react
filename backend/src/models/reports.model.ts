import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { Project } from './project.model'
import { Task } from './tasks.model'

const { UUID, UUIDV4 } = DataTypes

export const Report = sequelize.define(
  'reports',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    project_uuid: {
      type: UUID,
      references: {
        model: Project,
        key: 'UUID',
      },
      onDelete: 'CASCADE',
    },
    task_uuid: {
      type: UUID,
      references: {
        model: Task,
        key: 'UUID',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'reports',
    timestamps: false,
  }
)

Report.belongsTo(Project, { foreignKey: 'project_uuid' })
Report.belongsTo(Task, { foreignKey: 'task_uuid' })
