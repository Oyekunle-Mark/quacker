import { Vote, IVote } from './vote.model'

/**
 * Creates an vote
 *
 * @param {String}  voterId
 * @param {String} questionId
 * @param {String}  voteType
 * @return {Promise<IVote>}
 */
export const createVote = async (
  voterId: string,
  questionId: string,
  voteType: string
): Promise<IVote> => {
  const newAnswer = await Vote.create({
    voterId,
    questionId,
    voteType,
  })

  return newAnswer.get({ plain: true })
}

interface IFindVote {
  voterId: string
  questionId: string
}

/**
 * Finds a vote
 * @param {Object} findClause the where clause of the query
 * @return {Promise<IVote>}
 */
export const findVoteByField = (findClause: IFindVote): Promise<IVote> =>
  Vote.findOne({
    where: findClause,
    raw: true,
  })
