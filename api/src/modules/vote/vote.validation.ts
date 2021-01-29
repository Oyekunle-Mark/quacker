import { body, ValidationChain } from 'express-validator'
import { BaseValidator } from '../../common'
import { VoteType } from './vote.model'
import { findQuestionByField } from '../question/question.service'
import { createResponse, HttpStatusCode, ResponseStatus } from '../../common'
import { NextFunction, Request, Response } from 'express'

export default class VoteValidator extends BaseValidator {
  static createVoteValidationRules(): ValidationChain[] {
    return [
      body('questionId')
        .isUUID('all')
        .withMessage('questionId must be a valid uuid'),
      body('voteType')
        .isIn(Object.values(VoteType))
        .withMessage(`voteType can be any of ${Object.values(VoteType)}`),
    ]
  }

  static async checkQuestionExist(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { questionId } = req.body
      const question = await findQuestionByField({ id: questionId })

      if (!question.length) {
        return createResponse(
          res,
          HttpStatusCode.StatusBadRequest,
          ResponseStatus.Failure,
          'Question does not exist.'
        )
      }

      next()
    } catch (e) {
      return createResponse(
        res,
        HttpStatusCode.StatusInternalServerError,
        ResponseStatus.Error,
        `Error checking question exist: ${e.message}`
      )
    }
  }
}
