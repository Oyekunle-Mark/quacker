import { body, ValidationChain } from 'express-validator'
import { BaseValidator } from '../../common'

export default class QuestionValidator extends BaseValidator {
  static createQuestionValidationRules(): ValidationChain[] {
    return [
      body('title')
        .isLength({ min: 5, max: 256 })
        .withMessage('Provide a title between 5 and 256 characters'),
      body('content')
        .isLength({ min: 10 })
        .withMessage('content must be at least 10 characters'),
    ]
  }
}
