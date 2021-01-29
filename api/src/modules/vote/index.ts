import { Router } from 'express'
import { voteQuestion } from './vote.controller'
import VoteValidator from './vote.validation'
import { verifyToken } from '../../common'

const voteRoute = Router()

voteRoute.put(
  '/',
  verifyToken,
  VoteValidator.createVoteValidationRules(),
  VoteValidator.validate,
  VoteValidator.checkQuestionExist,
  voteQuestion
)

export { voteRoute }
