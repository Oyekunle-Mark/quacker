import { Request, Response } from 'express'
import {
  createQuestion,
  findQuestionByField,
  findQuestionId,
} from './question.service'
import { createResponse, HttpStatusCode, ResponseStatus } from '../../common'

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
      HttpStatusCode.StatusCreated,
      ResponseStatus.Success,
      question
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseStatus.Error,
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
export const getQuestions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const questions = await findQuestionByField({})

    return createResponse(
      res,
      HttpStatusCode.StatusOk,
      ResponseStatus.Success,
      questions
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseStatus.Error,
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
export const getUserQuestions = async (
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
      HttpStatusCode.StatusOk,
      ResponseStatus.Success,
      questions
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseStatus.Error,
      `Error getting user questions: ${err.message}`
    )
  }
}

/**
 * Get a single question
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const getQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params

    const question = await findQuestionId(id)

    return createResponse(
      res,
      HttpStatusCode.StatusOk,
      ResponseStatus.Success,
      question
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseStatus.Error,
      `Error getting question: ${err.message}`
    )
  }
}
