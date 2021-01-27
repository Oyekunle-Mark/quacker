import sequelize from 'sequelize'
import { logger } from '../common'

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOSTNAME, DB_PORT } = process.env

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const database = new sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  dialect: 'mysql',
  port: DB_PORT,
  pool: {
    min: 1,
    max: 10,
    acquire: 30000,
    idle: 10000,
  },
})

database
  .authenticate()
  .then(() => {
    logger(module).info(
      'Database connection has been established successfully.'
    )
  })
  .catch((err: Error) => {
    logger(module).error(`Unable to connect to the database: ${err}`)
  })

export default database
