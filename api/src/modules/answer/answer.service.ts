import { Answer, IAnswer } from './answer.model'

/**
 * Creates an answer
 *
 * @param {String}  creatorId
 * @param {String} questionId
 * @param {String}  content
 * @return {Promise<IQuestion>}
 */
export const createAnswer = async (
  creatorId: string,
  questionId: string,
  content: string
): Promise<IAnswer> => {
  const newAnswer = await Answer.create({
    creatorId,
    questionId,
    content,
  })

  return newAnswer.get({ plain: true })
}
