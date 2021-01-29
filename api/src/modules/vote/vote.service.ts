import { Vote, IVote } from './vote.model'

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
