import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { createResponse, HttpStatus, ResponseType } from './'

export class BaseValidator {
  static validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const errors = validationResult(req)

    if (errors.isEmpty()) return next()

    const extractedErrors: { [x: string]: string }[] = []

    errors
      .array()
      .forEach((err) => extractedErrors.push({ [err.param]: err.msg }))

    return createResponse(
      res,
      HttpStatus.StatusUnprocessableEntity,
      ResponseType.Failure,
      extractedErrors
    )
  }
}
