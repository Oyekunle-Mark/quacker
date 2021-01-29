import { Request, Response } from 'express'
import database from '../../db'
import { findVoteByField } from './vote.service'
import { Vote, VoteType } from './vote.model'
import { Question } from '../question/question.model'
import { createResponse, HttpStatusCode, ResponseStatus } from '../../common'

/**
 * vote a question
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const voteQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { questionId, voteType } = req.body
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req

    const existingVote = await findVoteByField({
      voterId: userId,
      questionId,
    })

    // user already voted question
    if (existingVote) {
      // if user already have the same vote, do nothing
      if (existingVote.voteType === voteType) {
        //
      } else {
        await database.transaction(async (t: any) => {
          // user voted up and and is now voting down
          if (existingVote.voteType === VoteType.Up) {
            await Vote.update(
              { voteType: VoteType.Down },
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              { where: { id: existingVote.id }, transaction: t }
            )

            const voteResult = await Question.decrement('votes', {
              by: 2,
              where: { id: questionId },
              transaction: t,
            })

            return voteResult[0][1]
          } else { // user voted down and is now voting up
            await Vote.update(
              { voteType: VoteType.Up },
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              { where: { id: existingVote.id }, transaction: t }
            )

            const voteResult = await Question.increment('votes', {
              by: 2,
              where: { id: questionId },
              transaction: t,
            })

            return voteResult[0][1]
          }
        })
      }
    } else {
      // register new vote
      await database.transaction(async (t: any) => {
        let voteResult: any

        await Vote.create(
          {
            voterId: userId,
            questionId,
            voteType,
          },
          { transaction: t }
        )

        if (voteType === VoteType.Up) {
          voteResult = await Question.increment('votes', {
            by: 1,
            where: { id: questionId },
            transaction: t,
          })
        } else {
          voteResult = await Question.decrement('votes', {
            by: 1,
            where: { id: questionId },
            transaction: t,
          })
        }

        return voteResult[0][1]
      })
    }

    return createResponse(
      res,
      HttpStatusCode.StatusOk,
      ResponseStatus.Success,
      'Vote successful'
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseStatus.Error,
      `Error voting question: ${err.message}`
    )
  }
}
