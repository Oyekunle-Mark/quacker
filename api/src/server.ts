import express, { Response } from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rTracer from 'cls-rtracer'
import fs from 'fs'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import { createResponse, HttpStatusCode, ResponseStatus } from './common'
import { userRoute, questionRoute, answerRoute, voteRoute } from './modules'

const server = express()
import swaggerDocument from './docs/swagger.json'
const swaggerSetupOptions = {}

server.use(express.json({ limit: '124kb' }))
server.use(
  express.urlencoded({
    extended: false,
    limit: '124kb',
  })
)

server.use(rTracer.expressMiddleware())

const morganFormat =
  '[:requestId] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../logs/access.log'),
  { flags: 'a' }
)
server.use(morgan(morganFormat)) // to console
server.use(
  // to file
  morgan(morganFormat, {
    stream: accessLogStream,
  })
)
morgan.token('requestId', (): string => <string>rTracer.id())

server.use(helmet())
server.use(compression())
server.use(cors())

server.get('/api', (_, res: Response) =>
  createResponse(
    res,
    HttpStatusCode.StatusOk,
    ResponseStatus.Success,
    'Server is up!'
  )
)

server.use('/api/auth', userRoute)
server.use('/api/questions', questionRoute)
server.use('/api/answers', answerRoute)
server.use('/api/votes', voteRoute)
server.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerSetupOptions)
) // Server Swagger API Documentation

server.use((_, res: Response) =>
  createResponse(
    res,
    HttpStatusCode.StatusNotFound,
    ResponseStatus.Failure,
    'Not Found.'
  )
)

export default server
