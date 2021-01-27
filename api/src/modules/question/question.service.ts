import { Question, IQuestion } from './question.model'
import { User } from '../user/user.model'

/**
 * Creates a question
 *
 * @param {String}  creatorId
 * @param {String} title
 * @param {String}  content
 * @return {Promise<IQuestion>}
 */
export const createQuestion = async (
  creatorId: string,
  title: string,
  content: string
): Promise<IQuestion> => {
  const newQuestion = await Question.create({
    creatorId,
    title,
    content,
  })

  return newQuestion.get({ plain: true })
}

export interface IFindQuestion {
  creatorId?: string
  id?: string
}

/**
 * Performs a find query on the question model
 * @param {Object} findClause the where clause of the query
 * @return {Promise<IQuestion[]>}
 */
export const findQuestionByField = (
  findClause: IFindQuestion
): Promise<IQuestion[]> =>
  Question.findAll({
    where: findClause,
    raw: true,
    attributes: {
      exclude: ['creatorId']
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'email'],
      },
    ],
  })
