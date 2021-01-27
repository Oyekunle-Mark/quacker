import { Request, Response } from 'express'
import { createUser, findUser } from './user.service'
import { createResponse, HttpStatus, ResponseType } from '../../common'
import { sign, hash, compare } from '../../utils'

/**
 * Registers a user
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstName, lastName, email, password } = req.body

  try {
    const hashedPassword = await hash(password)
    const user = await createUser(firstName, lastName, email, hashedPassword)

    const token = sign(user)

    return createResponse(res, HttpStatus.StatusCreated, ResponseType.Success, {
      id: user.id,
      email: user.email,
      token,
    })
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error registering user: ${err.message}`
    )
  }
}

/**
 * Logs a user in
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body

  try {
    const user = await findUser(email)

    if (!user) {
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        'Invalid login credentials provided.'
      )
    }

    const isMatch: boolean = await compare(password, user.password.toString())

    if (!isMatch) {
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        'Invalid login credentials provided.'
      )
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = user.id

    const token = sign({
      id: userId,
      email: user.email,
    })

    return createResponse(res, HttpStatus.StatusOk, ResponseType.Success, {
      id: userId,
      email: user.email,
      token,
    })
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error logging user in: ${err.message}`
    )
  }
}
