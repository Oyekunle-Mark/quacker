import { Response } from 'express'
import { logger } from './'

interface IHttpStatusCode {
  StatusOk: number
  StatusCreated: number
  StatusBadRequest: number
  StatusUnauthorized: number
  StatusNotFound: number
  StatusUnprocessableEntity: number
  StatusInternalServerError: number
}

export const HttpStatusCode: IHttpStatusCode = {
  StatusOk: 200,
  StatusCreated: 201,
  StatusBadRequest: 400,
  StatusUnauthorized: 401,
  StatusNotFound: 404,
  StatusUnprocessableEntity: 422,
  StatusInternalServerError: 500,
}

interface IResponseStatus {
  Success: string
  Failure: string
  Error: string
}

export const ResponseStatus: IResponseStatus = {
  Success: 'success',
  Failure: 'fail',
  Error: 'error',
}

/**
 * Builds, logs, and sends the response.
 *
 * @param {Response} res
 * @param {Number} httpStatusCode the status code
 * @param {String} responseStatus indicates if request was successful or not
 * @param {Object} data the data to be sent over
 */
export const createResponse = (
  res: Response,
  httpStatusCode: number,
  responseStatus: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: object | string
): Response => {
  let responseObject: Record<string, unknown>

  if (responseStatus === ResponseStatus.Error) {
    responseObject = {
      status: responseStatus,
      message: data,
    }

    logger(module).error(JSON.stringify(responseObject))
  } else {
    responseObject = {
      status: responseStatus,
      data,
    }

    logger(module).info(JSON.stringify(responseObject))
  }

  return res.status(httpStatusCode).json(responseObject)
}
