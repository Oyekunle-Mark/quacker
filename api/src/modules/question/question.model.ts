import { Model, DataTypes } from 'sequelize'
import database from '../../db'
import { User } from '../user/user.model'

export interface IQuestion extends Model {
  creatorId: string
  title: string
  content: string
  votes: number
}

export const Question = database.define<IQuestion>(
  'question',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
)
