import { Router } from 'express'
import {
  saveQuestion,
  getQuestions,
  getUserQuestions,
} from './question.controller'
import QuestionValidator from './question.validation'
import { verifyToken } from '../../common'

const questionRoute = Router()

questionRoute.post(
  '/',
  verifyToken,
  QuestionValidator.createQuestionValidationRules(),
  QuestionValidator.validate,
  saveQuestion
)

questionRoute.get('/', verifyToken, getQuestions)

questionRoute.get('/user', verifyToken, getUserQuestions)

export { questionRoute }
