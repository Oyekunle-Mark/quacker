import { Model, DataTypes } from 'sequelize'
import database from '../../db'
import { User } from '../user/user.model'
import { Question } from '../question/question.model'

export interface IAnswer extends Model {
  creatorId: string
  questionId: string
  content: string
}

export const Answer = database.define<IAnswer>(
  'answer',
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
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Question,
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

User.hasMany(Answer, {
  foreignKey: 'creatorId',
})
Answer.belongsTo(User, {
  foreignKey: 'creatorId',
})
Question.hasMany(Answer, {
  foreignKey: 'questionId',
})
Answer.belongsTo(Question, {
  foreignKey: 'questionId',
})
