import { Model, DataTypes } from 'sequelize'
import database from '../../db'

export interface IUser extends Model {
  firstName: string
  lastName: string
  email: string
  password: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const User: Model<IUser> = database.define<IUser>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)
