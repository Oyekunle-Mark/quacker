import { Request, Response } from 'express'
import { createQuestion, findQuestionByField } from './question.service'
import { createResponse, HttpStatus, ResponseType } from '../../common'

/**
 * saves a question
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const saveQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, content } = req.body
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req

    const question = await createQuestion(userId, title, content)

    return createResponse(
      res,
      HttpStatus.StatusCreated,
      ResponseType.Success,
      question
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error creating question: ${err.message}`
    )
  }
}

/**
 * Get all questions
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const qetQuestions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const questions = await findQuestionByField({})

    return createResponse(
      res,
      HttpStatus.StatusOk,
      ResponseType.Success,
      questions
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error getting questions: ${err.message}`
    )
  }
}

/**
 * Get all questions asked by a user
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const qetUserQuestions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req

    const questions = await findQuestionByField({ creatorId: userId })

    return createResponse(
      res,
      HttpStatus.StatusOk,
      ResponseType.Success,
      questions
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error getting user questions: ${err.message}`
    )
  }
}
