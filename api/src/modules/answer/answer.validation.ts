import { body, ValidationChain } from 'express-validator'
import { BaseValidator } from '../../common'
import { findQuestionByField } from '../question/question.service'
import { createResponse, HttpStatus, ResponseType } from '../../common'
import { NextFunction, Request, Response } from 'express'

export default class AnswerValidator extends BaseValidator {
  static createAnswerValidationRules(): ValidationChain[] {
    return [
      body('questionId')
        .isUUID('all')
        .withMessage('questionId must be a valid uuid'),
      body('content')
        .isLength({ min: 10 })
        .withMessage('content must be at least 10 characters'),
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
          HttpStatus.StatusUnprocessableEntity,
          ResponseType.Failure,
          'Question does not exist.'
        )
      }

      next()
    } catch (e) {
      return createResponse(
        res,
        HttpStatus.StatusInternalServerError,
        ResponseType.Failure,
        `Error checking question exist: ${e.message}`
      )
    }
  }
}
