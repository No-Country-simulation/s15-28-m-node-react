import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { Role } from './roles.model'

const { UUID, UUIDV4, STRING, TEXT, DATEONLY, INTEGER } = DataTypes

export const User = sequelize.define(
  'users',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    thumbnail: {
      type: TEXT,
    },
    first_name: {
      type: STRING(255),
      allowNull: false,
    },
    last_name: {
      type: STRING(255),
      allowNull: false,
    },
    password: {
      type: STRING(255),
      allowNull: false,
    },
    email: {
      type: STRING(255),
      allowNull: false,
    },
    birthdate: {
      type: DATEONLY,
    },
    phone: {
      type: STRING(50),
    },
    role_id: {
      type: INTEGER,
      references: {
        model: Role,
        key: 'id',
      },
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
)

User.belongsTo(Role, { foreignKey: 'role_id' })
