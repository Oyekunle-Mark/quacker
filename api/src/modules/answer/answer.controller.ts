import { Request, Response } from 'express'
import { createAnswer } from './answer.service'
import { createResponse, HttpStatus, ResponseType } from '../../common'

/**
 * answer a question
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const answerQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { questionId, content } = req.body
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req

    const answer = await createAnswer(userId, questionId, content)

    return createResponse(
      res,
      HttpStatus.StatusCreated,
      ResponseType.Success,
      answer
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error answering question: ${err.message}`
    )
  }
}
