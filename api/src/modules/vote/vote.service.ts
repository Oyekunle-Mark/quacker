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

/**
 * Performs a find query on the vote model
 * @param {Object} findClause the where clause of the query
 * @return {Promise<IVote[]>}
 */
export const findVoteByField = (findClause: IVote): Promise<IVote[]> =>
  Vote.findAll({
    where: findClause,
  })
