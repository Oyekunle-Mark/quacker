import { Request, Response } from 'express'
import { createUser, findUser } from './user.service'
import { createResponse, HttpStatusCode, ResponseStatus } from '../../common'
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

    return createResponse(
      res,
      HttpStatusCode.StatusCreated,
      ResponseStatus.Success,
      {
        id: user.id,
        email: user.email,
        token,
      }
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseStatus.Error,
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
        HttpStatusCode.StatusUnauthorized,
        ResponseStatus.Failure,
        'Invalid login credentials provided.'
      )
    }

    const isMatch: boolean = await compare(password, user.password.toString())

    if (!isMatch) {
      return createResponse(
        res,
        HttpStatusCode.StatusUnauthorized,
        ResponseStatus.Failure,
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

    return createResponse(
      res,
      HttpStatusCode.StatusOk,
      ResponseStatus.Success,
      {
        id: userId,
        email: user.email,
        token,
      }
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatusCode.StatusInternalServerError,
      ResponseStatus.Error,
      `Error logging user in: ${err.message}`
    )
  }
}
