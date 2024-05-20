import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { Project } from './project.model'

const { UUID, UUIDV4, TIME, DECIMAL } = DataTypes

export const Invoice = sequelize.define(
  'invoices',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    total_time: {
      type: TIME,
    },
    hourly_rate: {
      type: DECIMAL(10, 2),
    },
    project_uuid: {
      type: UUID,
      references: {
        model: Project,
        key: 'UUID',
      },
    },
  },
  {
    tableName: 'invoices',
    timestamps: false,
  }
)

Invoice.belongsTo(Project, { foreignKey: 'project_uuid' })
