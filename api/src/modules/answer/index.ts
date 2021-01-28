import { Router } from 'express'
import { answerQuestion } from './answer.controller'
import AnswerValidator from './answer.validation'
import { verifyToken } from '../../common'

const answerRoute = Router()

answerRoute.post(
  '/',
  verifyToken,
  AnswerValidator.createAnswerValidationRules(),
  AnswerValidator.validate,
  AnswerValidator.checkQuestionExist,
  answerQuestion
)

export { answerRoute }
