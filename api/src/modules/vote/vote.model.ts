import { Model, DataTypes } from 'sequelize'
import database from '../../db'
import { User } from '../user/user.model'
import { Question } from '../question/question.model'

export enum VoteType {
  Up = 'up',
  Down = 'down',
}

export interface IVote extends Model {
  voterId: string
  questionId: string
  voteType: VoteType
}

export const Vote = database.define<IVote>(
  'vote',
  {
    voterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      unique: 'voterIdToQuestionIdConstraint',
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Question,
        key: 'id',
      },
      unique: 'voterIdToQuestionIdConstraint',
    },
    voteType: {
      type: DataTypes.ENUM({
        values: Object.values(VoteType),
      }),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)
